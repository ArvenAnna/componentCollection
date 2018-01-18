import * as React from "react";
import * as PropTypes from "prop-types";
import './_CorePanel.less';

export default class CorePanel extends React.Component {
    static displayName = "Panel";

    static propTypes = {//
        "title": PropTypes.node, //

        // Modifiers
        "className": PropTypes.string, //
        "titleClassName": PropTypes.string, //
        "contentClassName": PropTypes.string, //
        "level": PropTypes.oneOf(["info", "warning", "error", "success"]), //
        "size": PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"]), //

        // States
        "active": PropTypes.bool, //
        "collapsed": PropTypes.bool //
    };

    static defaultProps = {
        active: true,
        collapsed: false
    };

    constructor(props) {
        super(props);

        this.state = {
            collapsed: this.isCollapsed(props)
        };

        this.handleClick = this.handleClick.bind(this);
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

    isCollapsed(panelProps) {
        return panelProps.collapsed;
    }

    componentWillReceiveProps(panelProps) {
        if (this.isCollapsed(panelProps) !== this.isCollapsed(this.props)) {
            this.setState({collapsed: this.isCollapsed(panelProps)});
        }
    }

    handleClick(e) {
        if (!this.props.active) {
            return;
        }
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        const className = this.classes("Panel", this.props.level && "Panel--" + this.props.level, this.props.size && "Badge--" + this.props.size, this.state.collapsed && "is-collapsed", this.props.className);
        const titleClassName = this.classes("Panel__title", this.props.titleClassName);
        const contentClassName = this.classes("Panel__content", this.props.contentClassName);

        return <div className={className}>
            <div className={titleClassName} onClick={this.handleClick}>{this.props.title}</div>
            <div className={contentClassName}>{this.props.children}</div>
        </div>;
    }
}
