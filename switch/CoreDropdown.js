import * as React from "react";
import * as ReactDOM from "react-dom";
import { Manager, Popper, Target } from "react-popper";
import Portal from "react-travel";
import './_CoreDropdown.less';
import './_CoreCaret.less';

const clickOutside = (nodes, types, eventHandler) => {
    function handleEvent(e) {
        for (let i = nodes.length; i--; ) {
            if (nodes[i].contains(e.target)) return;
        }
        eventHandler(e);
    }

    for (let i = types.length; i--; ) {
        document.addEventListener(types[i], handleEvent);
    }

    return {
        remove: function() {
            for (let i = types.length; i--; ) {
                document.removeEventListener(types[i], handleEvent);
            }
        }
    };
}

export function isRTL(elem) {
    const cs = window.getComputedStyle(elem, null).getPropertyValue("direction");
    return (cs || "").toLowerCase() === "rtl";
}

const isLegacyIE = /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;

export function isIE9OrBelow() {
    return isLegacyIE;
}



export default class Dropdown extends React.Component {
    outsideTap;
    manager;
    popper;
    target;

    constructor(props) {
        super(props);

        this.state = {
            open: !!props.open || false
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
        this.setOusideTap();
    }

    componentDidUpdate(lastProps, lastState) {
        if (lastState.open !== this.state.open) {
            setTimeout(() => this.setOusideTap());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open != nextProps.open) {
            this.setState(() => ({open: !!nextProps.open}));
        }
    }

    componentWillUnmount() {
        this.outsideTap.remove();
    }

    setOusideTap = () => {
        const elements = [this.target];

        if (this.popper) {
            elements.push(this.popper);
        }

        if (this.outsideTap) {
            this.outsideTap.remove();
        }

        this.outsideTap = clickOutside(
            elements,
            ["click", "touchstart"],
            this.handleOutsideTap
        );
    }

    handleOutsideTap = () => {
        this.setState({ open: false });
    }

    handleClick = event => {
        if (this.props.open && this.state.open) {
            return;
        }

        this.setState(oldState => ({
            open: !oldState.open
        }));
        event.preventDefault();
    }

    renderTrigger() {
        if (typeof this.props.trigger === "function") {
            return this.props.trigger(
                this.state.open,
                <span className={this.classes("Caret")} />
            );
        }

        return this.props.trigger;
    }

    getPlacement(up) {
        if (this.manager && isRTL(this.manager)) {
            return up ? "top-end" : "bottom-end";
        } else {
            return up ? "top-start" : "bottom-start";
        }
    }

    render() {
        const {
            namespace,
            disabled,
            open,
            size,
            up,
            trigger,
            children,
            className,
            block,
            ...props
        } = this.props;

        const classes = this.classes(
            "Dropdown",
            disabled && "is-disabled",
            this.state.open && "is-open",
            size && "Dropdown--" + size,
            up && "Dropdown--dropup",
            block && "Dropdown--block",
            isIE9OrBelow() && "Dropdown--legacy",
            className
        );

        let ManagerComponent = isIE9OrBelow() ? "div" : Manager;
        let TargetComponent = isIE9OrBelow() ? "div" : Target;
        let targetProps = {innerRef: c => (this.target = ReactDOM.findDOMNode(c))};

        if (isIE9OrBelow()) {
            targetProps.ref = targetProps.innerRef;
            delete targetProps.innerRef;
        }

        // TODO :: report "block" and "size" to the child popper automatically

        return (
            <ManagerComponent
                className={classes}
                tabIndex={0}
                ref={manager => (this.manager = ReactDOM.findDOMNode(manager))}
                {...props}
            >
                <TargetComponent
                    className={this.classes("Dropdown__trigger")}
                    onClick={this.handleClick}
                    {...targetProps}
                >
                    {this.renderTrigger()}
                </TargetComponent>

                {this.renderPopper(children, up)}
            </ManagerComponent>
        );
    }

    renderPopper(children, up) {
        if (!this.state.open) {
            return;
        }

        if (isIE9OrBelow()) {
            return (
                <div
                    className={this.classes("Dropdown__popper")}
                    ref={c => (this.popper = c)}
                >
                    {children}
                </div>
            );
        }

        return (
            <Portal>
                <Popper
                    className={this.classes("Dropdown__popper")}
                    placement={this.getPlacement(up)}
                    innerRef={c => {
                        this.popper = ReactDOM.findDOMNode(c);
                    }}
                >
                    {children}
                </Popper>
            </Portal>
        );
    }
}
