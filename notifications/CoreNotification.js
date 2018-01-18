import * as React from "react";
import * as PropTypes from "prop-types";
import IconClose from '../svg/core/IconClose.svg';
import IconError_outline from '../svg/core/IconError_outline.svg';
import IconInfo_outline from '../svg/core/IconInfo_outline.svg';
import IconSuccess_outline from '../svg/core/IconSuccess_outline.svg';
import IconWarning_outline from '../svg/core/IconWarning_outline.svg';
import './_CoreNotifications.less';

export default class CoreNotification extends React.Component {
    static displayName = "Alert";

    static propTypes = {//
        "level": PropTypes.oneOf(["info", "warning", "error", "success"]).isRequired, //
        "className": PropTypes.string, //
        "onClose": PropTypes.func
    };

    getIcon() {
        switch (this.props.level) {
            case "info":
                return <IconInfo_outline />;
            case "error":
                return <IconError_outline />;
            case "success":
                return <IconSuccess_outline />;
            case "warning":
                return <IconWarning_outline />;
        }

        return <IconInfo_outline />;
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
        const {namespace, className, level, onClose, children, ...props} = this.props;
        return <div className={this.classes("Notification", "Notification--" + level, className)} {...props}>
            <div className={this.classes("Notification__container")}>
                <div className={this.classes("Notification__icon")}>{this.getIcon()}</div>
                <div className={this.classes("Notification__content")}>
                    {onClose == null ? null : <button className={this.classes("Notification__close")} onClick={onClose}><IconClose /></button>}
                    {children}
                </div>
            </div>
        </div>;
    }
}

export class CoreNotificationActions extends React.Component {
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
        const {namespace, className, ...props} = this.props;
        return <div className={this.classes("Notification__actions", className)} {...props} />;
    }
}
