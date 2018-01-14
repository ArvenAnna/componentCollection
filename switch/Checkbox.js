import React from 'react';
import * as PropTypes from "prop-types";
import './_Checkbox.less';

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        "name": PropTypes.string,
        "defaultChecked": PropTypes.bool,
        "checked": PropTypes.bool,
        "onChange": PropTypes.func,
        "disabled": PropTypes.bool,
        "className": PropTypes.string,
        "isSwitch": PropTypes.bool
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
        const classes = this.classes(
            "Checkbox",
            this.props.isSwitch && "Checkbox--switch",
            this.props.className
        );

        return <label className={classes}>
            {this.renderInput()}
            <span className={this.classes("Checkbox__label")}>
                {this.props.children}
            </span>
        </label>;
    }

    renderInput() {
        const options = {};
        if (this.props.name != null) {
            options.name = this.props.name;
        }
        if (this.props.checked != null) {
            options.checked = this.props.checked;
        }
        if (this.props.defaultChecked != null) {
            options.defaultChecked = this.props.defaultChecked;
        }
        return <input onChange={this.handleChange} type="checkbox" value="1" disabled={!!this.props.disabled} {...options} />;
    }

    handleChange(event) {
        if (this.props.onChange != null) {
            this.props.onChange(event.target.checked, event);
        }
    }
}