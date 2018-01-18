import * as React from "react";
import * as PropTypes from "prop-types";

import './_CoreLoader.less';

export default class CoreLoader extends React.Component {

    static propTypes = {//
        "type": PropTypes.oneOf(["pulse", "circle", "linear", "dot"]), //
        "className": PropTypes.string
    };

    static defaultProps = {
        type: "pulse"
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
        const className = this.classes(
            "Loader",
            this.props.type && "Loader--" + this.props.type,
            this.props.className
        );

        return <div className={className}>
            <span className={this.classes("Loader__indicator")}></span>
            {this.props.children}
        </div>;
    }
}
