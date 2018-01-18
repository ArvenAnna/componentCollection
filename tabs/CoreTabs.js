import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreTabs.less';

export function getChildren<P>(children)  {
    if (children == null) {
        return [];
    }

    return Array.isArray(children) ? children : [children];
}

export class CoreTabsPanel extends React.Component {
    static displayName = "TabsPanel";

    static propTypes = {
        title: PropTypes.node.isRequired,
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        hidden: PropTypes.bool
    };

    render() {
        return <div>{this.props.children}</div>;
    }
}



export default class Tabs extends React.Component {
    static displayName = "Tabs";

    static propTypes = {
        className: PropTypes.string,
        position: PropTypes.oneOf(["bottom"]),
        variant: PropTypes.oneOf(["loud"]),
        block: PropTypes.bool,
        tabActive: PropTypes.number,
        onMount: PropTypes.func,
        onBeforeChange: PropTypes.func,
        onAfterChange: PropTypes.func,
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            tabActive: props.tabActive
        };
    }

    static defaultProps = {
        tabActive: 1,
        children: []
    };

    componentDidMount() {
        const index = this.state.tabActive;
        const $selectedPanel = this.refs["tab-panel"];
        const $selectedMenu = this.refs["tab-menu-" + index];
        if (this.props.onMount != null) {
            this.props.onMount(index, $selectedPanel, $selectedMenu);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabActive != null) {
            this.setState({tabActive: nextProps.tabActive});
        }
    }

    render() {
        const className = this.classes(
            "Tabs",
            (this.props.variant == null ? "" : "Tabs--" + this.props.variant),
            (this.props.position == null ? "" : "Tabs--" + this.props.position),
            (this.props.block ? "Tabs--block" : ""),
            (this.props.className == null ? "" : this.props.className)
        );

        return <div className={className}>
            { this.props.position !== "bottom" ? this.renderMenuItems() : null }
            { this.renderPanels() }
            { this.props.position === "bottom" ? this.renderMenuItems() : null }
        </div>;
    }

    setActive(index, e) {
        e.preventDefault();
        e.stopPropagation();

        const onAfterChange = this.props.onAfterChange;
        const onBeforeChange = this.props.onBeforeChange;
        const $selectedPanel = this.refs["tab-panel"];
        const $selectedMenu = this.refs["tab-menu-" + index];

        if (onBeforeChange != null && !onBeforeChange(index, $selectedPanel, $selectedMenu)) {
            return;
        }

        this.setState({tabActive: index}, () => {
            if (onAfterChange != null) {
                onAfterChange(index, $selectedPanel, $selectedMenu);
            }
        });
    }

    handleKeyDown(index, event) {
        let newActive = null;
        if (event.keyCode === 37 || event.keyCode === 38) {
            newActive = this.findPreviousActive();
        } else if (event.keyCode === 39 || event.keyCode === 40) {
            newActive = this.findNextActive();
        } else if (event.which === 32) {
            newActive = index;
        }
        if (newActive != null) {
            this.setActive(newActive, event);
        }
    }

    findNextActive() {
        let currentIndex = this.state.tabActive - 1;
        currentIndex++;
        while (this.props.children[currentIndex] != null) {
            const panel = this.props.children[currentIndex];
            if (!panel.props.disabled && !panel.props.hidden) {
                return currentIndex + 1;
            }
            currentIndex++;
        }
        return null;
    }

    findPreviousActive() {
        let currentIndex = this.state.tabActive - 1;
        currentIndex--;
        while ((this.props.children[currentIndex] != null)) {
            const panel = this.props.children[currentIndex];
            if (!panel.props.disabled && !panel.props.hidden) {
                return currentIndex + 1;
            }
            currentIndex--;
        }
        return null;
    }

    renderPanels() {
        let children = getChildren(this.props.children);
        const that = this;

        const $panelsItems = children.map(($panel, arrIndex, strings) => {
            let panel = $panel;
            const index = arrIndex + 1;
            const panelClasses = this.classes(
                "Tabs__panel",
                (that.state.tabActive === index) ? "is-display" : "",
                (panel.props.className == null ? "" : panel.props.className)
            );
            return <div ref="tab-panel" key={arrIndex} className={panelClasses} role="tabpanel">{$panel}</div>;
        });

        return $panelsItems;
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

    renderMenuItems() {
        if (this.props.children == null) {
            throw new Error("Tabs must contain at least one TabsPanel");
        }

        let children = getChildren(this.props.children);

        const that = this;
        const $menuItems = children.map(($panel, arrIndex, strings) => {
                let panel = $panel;
                const index = arrIndex + 1;
                const title = panel.props.title;
                const itemClasses = this.classes("Tabs__item", (that.state.tabActive === index) ? "is-active" : "", (panel.props.disabled ? "is-disabled" : ""), (panel.props.hidden ? "is-hidden" : ""));
                const parameters = {
                    "tabIndex": panel.props.disabled || panel.props.hidden ? -1 : 0,
                    "aria-selected": that.state.tabActive === index ? "true" : "false",
                    "aria-expanded": that.state.tabActive === index ? "true" : "false",
                };
                if (!panel.props.disabled && !panel.props.hidden) {
                    parameters.onClick = (event) => that.setActive(index, event);
                    parameters.onKeyDown = (event) => that.handleKeyDown(index, event);
                }
                if (panel.props.disabled) {
                    parameters["aria-disabled"] = "true";
                }
                if (panel.props.hidden) {
                    parameters["aria-hidden"] = "true";
                }

                parameters.children = title;

                return <li ref={"tab-menu-" + index} key={arrIndex} className={itemClasses} role="tab" {...parameters} />;
            }
        );

        return <ul className={this.classes("Tabs__list")}>{$menuItems}</ul>;
    }
}
