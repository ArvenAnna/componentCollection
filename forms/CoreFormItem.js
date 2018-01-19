import * as React from "react";
import './_CoreForms.less';

export default class CoreFormItem extends React.Component {

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
        const hasError = this.props.hasError || this.props.errorMessage;
        const className = this.classes("Form__item", this.props.className, this.props.required && "is-required", hasError && "has-error");
        const controlClassName = this.classes("Form__item__control", this.props.controlClassName, this.props.addons && "has-addon", this.props.icons && "has-icon");

        return <div className={className}>
            <div className={this.classes("Form__item__container")}>
                <label className={this.classes("Form__item__label")}
                       htmlFor={this.props.htmlFor}>{this.props.label}</label>
                <div className={controlClassName}>
                    {this.props.children}
                </div>
            </div>
            {this.props.errorMessage && (
                <div
                    className={this.classes("Form__item__message")}>
                    {this.props.errorMessage}
                </div>
            )}
        </div>;
    }
}
