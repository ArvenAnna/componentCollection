import * as React from "react";
import './_CoreMenu.less';
import ReactDOM from 'react-dom';


export class CoreMenu extends React.Component {
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
        const {namespace, className, block, size, ...props} = this.props;
        const classes = this.classes(
            "Menu",
            (block && "Menu--block"),
            (size && "Menu--" + size),
            className
        );
        return <ul className={classes} {...props} />;
    }
}

export class CoreMenuHeader extends React.Component {
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
        return <li className={this.classes("Menu__header", className)} {...props} />;
    }
}

export class CoreMenuDivider extends React.Component {
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
        return <li className={this.classes("Menu__divider " + className)} {...props} />;
    }
}

export class CoreMenuItem extends React.Component {
    leaveTimeout;

    constructor(props) {
        super(props);

        this.state = {
            open: props.open || false
        };
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

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, true);
    }

    ignoreEvents() {
        return this.props.open || this.props.disabled;
    }

    handleClickOutside = (e) => {
        if (this.ignoreEvents()) {
            return;
        }

        const el = ReactDOM.findDOMNode(this.refs["container"]);
        if (!el.contains(e.target)) {
            this.setState({open: false});
        }
    }

    handleEnter = () => {
        if (this.ignoreEvents()) {
            return;
        }

        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
        }

        this.setState({
            open: true
        });
    }

    handleLeave = () => {
        if (this.ignoreEvents()) {
            return;
        }

        // As there is a space between elements
        // we don't want to close the menu instantly
        this.leaveTimeout = setTimeout(() => {
            this.setState({
                open: false
            });
        }, 200);
    }

    handleClick = (e) => {
        if (this.ignoreEvents()) {
            return;
        }

        //Ignore if it comes from an inner menu
        const el = ReactDOM.findDOMNode(this.refs["container"]);
        for (let i = 0; i < el.children.length; i++) {
            if (el.children[i].className.match(/(^| )Menu( |$)/) && el.children[i].contains(e.target)) {
                return;
            }
        }

        this.setState((state) => ({
            open: !state.open
        }));

        if (this.props.onClick) {
            this.props.onClick(e);
        }

        e.stopPropagation();
    }

    getEvents() {
        if (this.props.hoverable) {
            return {
                onMouseEnter: this.handleEnter,
                onMouseLeave: this.handleLeave
            };
        }

        return {
            onClick: this.handleClick
        };
    }

    render() {
        const {namespace, className, submenu, children, hoverable, open, disabled, ...props} = this.props;
        const classes = this.classes("Menu__item", (submenu ? "has-submenu " : ""), this.state.open && "is-open", className);

        return (
            <li ref="container" {...props} {...this.getEvents()} className={classes}>
                {children}{submenu && <span className={this.classes("Caret")} />}
            </li>
        );
    }
}