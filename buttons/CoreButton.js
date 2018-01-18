import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreButton.less';

export default class CoreButton extends React.Component {

    static propTypes = {//
        "type": PropTypes.string, //
        "href": PropTypes.string, //

        // Modifiers
        "className": PropTypes.string, //
        "level": PropTypes.oneOf(["info", "warning", "error", "success"]), //
        "size": PropTypes.oneOf(["xsmall", "small", "large"]), //
        "variant": PropTypes.oneOf(["primary", "secondary", "cta", "text", "flat"]), //
        "block": PropTypes.bool, //

        // States
        "disabled": PropTypes.bool, //
        "active": PropTypes.bool, //
        "loading": PropTypes.bool, //

        // Handlers
        "onClick": PropTypes.func, //
        "onBlur": PropTypes.func
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
        const {variant, level, size, loading, block, active, ...props} = this.props;

        if (loading || props.disabled) {
            props.tabIndex = -1;
        }

        if (props.disabled) {
            props["aria-disabled"] = "true";
        }

        props.className = this.classes(
            "Button",
            variant && "Button--" + variant,
            size && "Button--" + size,
            level && "Button--" + level,
            block && "Button--block",
            active && "is-active",
            loading && "is-loading",
            props.disabled && "is-disabled",
            this.props.className);

        return (props.href)
            ? <a role="button" {...props } />
            : <button {...props } />;
    }
}
