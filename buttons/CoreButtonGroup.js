import * as React from "react";
import * as PropTypes from "prop-types";

import './_CoreButtongroup.less';

export default class CoreButtonGroup extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        vertical: PropTypes.bool,
        block: PropTypes.bool,
        children: PropTypes.node.isRequired
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
            "ButtonGroup",
            this.props.vertical && "ButtonGroup--vertical",
            this.props.block && "ButtonGroup--block",
            this.props.className
        );

        return <div className={className}>
            {this.props.children}
        </div>;
    }
}
