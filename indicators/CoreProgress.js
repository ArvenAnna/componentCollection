import * as React from "react";
import './_CoreProgress.less';

export default class CoreProgress extends React.Component {
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
        const classes = this.classes("Progress", (this.props.level != null ? "Progress--" + this.props.level : ""), this.props.className);
        const progressStyle = { width: this.props.percent + "%" };

        return <div>
            <div className={classes}>
                <span className={this.classes("Progress__value")} style={progressStyle}>{this.props.percent + "%"}</span>
            </div>
            <div className={this.classes("Progress__text")}>{this.props.children}</div>
        </div>;
    }
}
