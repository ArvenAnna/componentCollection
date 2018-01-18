import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreNav.less';

export default class CoreNav extends React.Component {

    static propTypes = {//
        "size": PropTypes.oneOf(["small", "large"]), //
        "horizontal": PropTypes.bool, //
        "hoverable": PropTypes.bool, //
        "loud": PropTypes.bool, //
        "disabled": PropTypes.bool, //
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
        const {namespace, size, horizontal, hoverable, loud, disabled, className, ...props} = this.props;
        const classes = this.classes(
            "Nav",
            size && "Nav--" + size,
            horizontal && "Nav--horizontal",
            hoverable && "Nav--hoverable",
            loud && "Nav--loud",
            disabled && "is-disabled",
            className
        );

        return <div className={classes} {...props} />;
    }
}

export class CoreNavItem extends React.Component {

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
        const {namespace, href, className, linkClassName, disabled, active, ...props} = this.props;

        // TODO :: find a way to disable links, that isn't the disabled prop on anchor
        return <div className={this.classes("Nav__item", className)}>
            {href ?
                <a href={href} className={this.classes("Nav__link", active && "is-active", disabled && "is-disabled", linkClassName)} {...props} /> : props.children}
        </div>;
    }
}
