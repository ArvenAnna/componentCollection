import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreRadio.less';

export default class CoreRadio extends React.Component {
    context;

    static propTypes = {//
        "value": PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]), //
        "disabled": PropTypes.bool, //
        "className": PropTypes.string, //

        // Only for standalone
        "name": PropTypes.string, //
        "defaultChecked": PropTypes.bool, //
        "checked": PropTypes.bool, //
        "onChange": PropTypes.func //
    };

    static contextTypes = {
        namespace: PropTypes.string,
        radioGroup: PropTypes.object
    };

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

    renderInput() {
        const options = {};

        // The name on the Radio takes
        // precedence on the name on the RadioGroup
        if (this.props.name != null) {
            options.name = this.props.name;
        } else if (this.context.radioGroup && this.context.radioGroup.name !== undefined) {
            options.name = this.context.radioGroup.name;
        }

        // The checked state on the Radio takes
        // precedence on the one of the RadioGroup
        if (this.props.checked != null) {
            options.checked = this.props.checked;
        } else if (this.context.radioGroup && this.context.radioGroup.selectedValue !== undefined) {
            options.checked = (this.props.value === this.context.radioGroup.selectedValue);
        }

        if (this.props.defaultChecked != null) {
            options.defaultChecked = this.props.defaultChecked;
        }

        return <input onChange={this.handleChange} type="radio"
                      value={this.props.value}
                      disabled={!!this.props.disabled} {...options} />;
    }

    handleChange = (e) => {
        // Call it on the RadioGroup
        if (this.context.radioGroup && typeof this.context.radioGroup.onChange === "function") {
            this.context.radioGroup.onChange(this.props.value, e);
        }

        // Call it on the component itself
        if (typeof this.props.onChange === "function") {
            this.props.onChange(e.checked, e);
        }
    }

    render() {
        const classes = this.classes("Radio", this.props.className == null ? "" : this.props.className);

        return <label className={classes}>
            {this.renderInput()}
            <span className={this.classes("Radio__label")}>{this.props.children}</span>
        </label>;
    }
}
