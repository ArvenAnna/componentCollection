import * as React from "react";
import Cancel from "../svg/core/IconClose.svg";
import Portal from "react-travel";
import './_CoreDialog.less';

export default class Dialog extends React.Component {
    handleClose = () => {
        this.props.onClose();
    }

    renderChildren(children) {
        if (typeof children === "function") {
            return children(
                <span className={this.classes("Dialog__close")}
                      onClick={this.handleClose}>
        <Cancel/>
      </span>
            );
        }

        return children;
    }

    toCamelCase(str) {
        if (!str) {
            return str;
        }

        const words = str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
        words[0] = words[0].toLowerCase();
        return words.join("");
    }

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.toCamelCase(this.props.namespace || this.context.namespace);
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }

    render() {
        const {namespace, className, backdrop, open, children, onClose, ...props} = this.props;
        const classes = this.classes(
            "Dialog",
            "is-open",
            (backdrop && "has-backdrop"),
            className
        );
        return open ? <Portal>
            <div className={classes} aria-hidden="false" role="dialog" {...props}>
                <div className={this.classes("Dialog__container")}
                     role="document">
                    {this.renderChildren(children)}
                </div>
            </div>
        </Portal> : <span />;
    }
}

export class CoreDialogHeader extends React.Component {

    toCamelCase(str) {
        if (!str) {
            return str;
        }

        const words = str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
        words[0] = words[0].toLowerCase();
        return words.join("");
    }

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.toCamelCase(this.props.namespace || this.context.namespace);
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }

    render() {
        const {namespace, className, ...props} = this.props;
        return <div
            className={this.classes("Dialog__header", className)} {...props} />;
    }
}

export class CoreDialogFooter extends React.Component {

    toCamelCase(str) {
        if (!str) {
            return str;
        }

        const words = str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
        words[0] = words[0].toLowerCase();
        return words.join("");
    }

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.toCamelCase(this.props.namespace || this.context.namespace);
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }

    render() {
        const {namespace, className, ...props} = this.props;
        return <div
            className={this.classes("Dialog__footer", className)} {...props} />;
    }
}

export class CoreDialogContent extends React.Component {

    toCamelCase(str) {
        if (!str) {
            return str;
        }

        const words = str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
        words[0] = words[0].toLowerCase();
        return words.join("");
    }

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.toCamelCase(this.props.namespace || this.context.namespace);
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }

    render() {
        const {namespace, className, ...props} = this.props;
        return <div className={this.classes("Dialog__content", className)} {...props} />;
    }
}
