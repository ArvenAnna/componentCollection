import * as React from "react";
import './_CoreCard.less';

//CoreNenu Not implemented yet, relies on Dropdown

export default class CoreCard extends React.Component {
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
        return <div className={this.classes("Card", className)} {...props} />;
    }
}


export class CoreCardMedia extends React.Component {
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
        const {namespace, className, children, ...props} = this.props;

        return <div className={this.classes("Card__media", className)}>
            <img {...props} />
            {children && <div className={this.classes("Card__media__extra", "Card__media__extra--inverse")}>
                <div className={this.classes("Card__media__legend")}>
                    {children}
                </div>
            </div>}
        </div>;
    }
}


export class CoreCardItem extends React.Component {
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
        return <div {...props}
                    className={this.classes("Card__item", className)} />;
    }
}


export class CoreCardActions extends React.Component {
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
        return <div {...props}
                    className={this.classes("Card__actions", className)} />;
    }
}


export class CoreCardHeader extends React.Component {
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
        const {namespace, className, divided, ...props} = this.props;
        return <div {...props}
                    className={this.classes("Card__header", divided && "has-divider", className)} />;
    }
}


export class CoreCardFooter extends React.Component {
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
        const {namespace, className, divided, ...props} = this.props;
        return <div {...props}
                    className={this.classes("Card__footer", divided && "has-divider", className)} />;
    }
}

export class CoreCardText extends React.Component {
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
        return <p {...props} className={this.classes("Card__text", className)} />;
    }
}

export class CoreCardMenu extends React.Component {
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
        return <div {...props} className={this.classes("Card__menu", className)}>⋮</div>;
    }
}
