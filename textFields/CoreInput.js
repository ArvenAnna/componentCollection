import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreInput.less';

const ESC_KEY_CODE = 27;

export default class CoreInput extends React.Component {

    static propTypes = {//
        "id": PropTypes.string, //
        "value": PropTypes.string, //
        "defaultValue": PropTypes.string, //
        "placeholder": PropTypes.string, //
        "type": PropTypes.string, //
        "name": PropTypes.string, //
        "maxLength": PropTypes.number, //

        "disabled": PropTypes.bool, //
        "readOnly": PropTypes.bool, //

        "onChange": PropTypes.func, //
        "onFocus": PropTypes.func, //
        "onBlur": PropTypes.func, //
        "onKeyDown": PropTypes.func, //

        "className": PropTypes.string, //
        "size": PropTypes.oneOf(["small", "large"]) //
    };

    wrappedInput;
    placeholderSupport;
    needsManualPlaceholding;

    constructor(props) {
        super(props);

        this.state = {
            placeholderActive: false
        };

        this.placeholderSupport = ("placeholder" in document.createElement("input"));
        this.needsManualPlaceholding = this.props.placeholder && !this.placeholderSupport;
    }

    toCamelCase(str) {
        if (!str) {
            return str;
        }

        const words = str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
        words[0] = words[0].toLowerCase();
        return words.join("");
    }

    getNamespace()  {
        return this.toCamelCase(this.props.namespace || this.context.namespace);
    }

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.getNamespace();
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }

    render() {
        const {className, size, ...props} = this.props;
        const classes = this.classes("Input", (size && "Input--" + size), className);

        if (props.readOnly || props.disabled) {
            props["tabIndex"] = -1;
        }

        if (props.disabled) {
            props["aria-disabled"] = "true";
        }

        return (<div className="u-posRelative">
            {this.renderPlaceholder()}
            <input className={classes}
                   {...props}
                   onFocus={this.handleFocus}
                   onBlur={this.handleBlur}
                   onKeyDown={this.handleKeyDown}
                   ref={(input) => { this.wrappedInput = input; }}
            />
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        this.needsManualPlaceholding = !this.placeholderSupport && !!nextProps.placeholder;
    }

    componentDidMount() {
        if (this.needsManualPlaceholding) {
            setTimeout(() => this.setPlaceholderActive(this.wrappedInput && !this.wrappedInput.value), 0);
        }
    }

    renderPlaceholder() {
        if (this.needsManualPlaceholding && this.state.placeholderActive) {
            return <div className={this.classes("Input__placeholder")} onClick={this.handlePlaceholderClick}>{this.props.placeholder}</div>;
        }
        return null;
    }

    handlePlaceholderClick = () => {
        this.wrappedInput.focus();
    }

    handleFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
        this.setPlaceholderActive(false);
    }

    handleBlur = (event) =>  {
        this.setPlaceholderActive(!this.wrappedInput.value);
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    setPlaceholderActive(active) {
        if (this.needsManualPlaceholding) {
            this.setState({
                placeholderActive: active
            });
        }
    }

    // prevent IE from wiping data out from input and form
    handleKeyDown = (event) =>  {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }

        if (event.keyCode === ESC_KEY_CODE) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
