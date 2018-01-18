import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreTextarea.less';

export default class Textarea extends React.Component {

    static propTypes = {//
        "id": PropTypes.string, //
        "value": PropTypes.string, //
        "defaultValue": PropTypes.string, //
        "placeholder": PropTypes.string, //
        "name": PropTypes.string, //
        "maxLength": PropTypes.number, //

        "disabled": PropTypes.bool, //
        "readOnly": PropTypes.bool, //

        "onChange": PropTypes.func, //
        "onBlur": PropTypes.func, //
        "onFocus": PropTypes.func, //

        "className": PropTypes.string, //
        "size": PropTypes.oneOf(["small", "large"]) //
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

    render() {
        const {className, size, ...props} = this.props;

        if (props.disabled) {
            props["tabIndex"] = -1;
            props["aria-disabled"] = "true";
        }

        const classes = this.classes(
            "Textarea",
            (size && "Textarea--" + size),
            this.props.readOnly && "Textarea--readonly",
            className
        );

        if (this.props.readOnly) {
            return <div className={classes}>{props.value || props.defaultValue}</div>;
        }

        return <textarea className={classes} {...props} />;
    }
}

