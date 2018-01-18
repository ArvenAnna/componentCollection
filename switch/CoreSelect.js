import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreSelect.less';

export default class CoreSelect extends React.Component {

    static propTypes = {//
        "options": PropTypes.object, //
        "selectedOptionValue": PropTypes.string, //
        "disabled": PropTypes.bool, //
        "active": PropTypes.bool, //
        "loading": PropTypes.bool, //

        "onChange": PropTypes.func, //

        "className": PropTypes.string, //
        "level": PropTypes.oneOf(["info", "warning", "error", "success"]), //
        "size": PropTypes.oneOf(["small", "large"])
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


    buildOptionsList() {
        const optionsList = [];
        for (let key in this.props.options) {
            if (!this.props.options.hasOwnProperty(key)) {
                continue;
            }

            let label = this.props.options[key];
            const selected = this.props.selectedOptionValue === key;
            optionsList.push(<option className={this.classes("Select__option")} value={key} key={key} selected={selected}>{label}</option>);
        }

        return optionsList;
    }

    buildSelectProperties() {
        const properties = {};
        if (this.props.onChange) {
            properties.onChange = this.props.onChange;
        }
        if (this.props.name != null) {
            properties.name = this.props.name;
        }
        if (this.props.selectedOptionValue != null) {
            properties.value = this.props.selectedOptionValue;
        }
        if (this.props.loading || this.props.disabled) {
            properties.tabIndex = -1;
        }
        if (this.props.disabled) {
            properties["aria-disabled"] = "true";
            properties.disabled = this.props.disabled;
        }

        properties.children = this.buildOptionsList();

        return properties;
    }

    render() {
        const className = this.classes(
            "Select",
            (this.props.size == null ? "" : "Select--" + this.props.size),
            (this.props.level == null ? "" : "Select--" + this.props.level),
            (this.props.active ? "is-active" : ""),
            (this.props.loading ? "is-loading" : ""),
            (this.props.disabled ? "is-disabled" : ""),
            (this.props.className == null ? "" : this.props.className)
        );

        return <div className={className}>
            <select {...this.buildSelectProperties()} />
        </div>;
    }
}
