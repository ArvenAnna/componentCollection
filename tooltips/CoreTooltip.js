import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import { Arrow, Manager, Popper, Target } from "react-popper";
import Portal from "react-travel";
import "./_CoreTooltip.less";

// utils

export function isRTL(elem) {
    const cs = window.getComputedStyle(elem, null).getPropertyValue("direction");
    return (cs || "").toLowerCase() === "rtl";
}

const isLegacyIE = /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;

export function isIE9OrBelow() {
    return isLegacyIE;
}


export function getComputedStyle(elem) {
    // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    let view = elem.ownerDocument.defaultView;
    if ( !view || !view.opener ) {
        view = window;
    }
    return view.getComputedStyle(elem);
}

export function getCSSAttr(computed, attr) {
    return computed.getPropertyValue( attr ) || computed[ attr ];
}

export function getCSSAttrNumeric(computed, attr) {
    const val = getCSSAttr(computed, attr);
    let value = parseInt(val, 10);
    // we must check for NaN for ie 8/9
    return isNaN(value) ? 0 : value;
}

export function getOffset(elem) {
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if ( !elem.getClientRects().length ) {
        return { top: 0, left: 0 };
    }

    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    let rect = elem.getBoundingClientRect();
    let win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}

export function getScrollTop(elem) {
    let win;
    if (elem && elem === elem.window) {
        win = elem;
    } else if ( elem.nodeType === 9 ) {
        win = elem.defaultView;
    }

    return win ? win.pageYOffset : elem.scrollTop;
}

export function getElementPosition(elem, computed) {
    let offsetParent, offset, doc,
        parentOffset = { top: 0, left: 0 };

    // position:fixed elements are offset from the viewport, which itself always has zero offset
    if ( getCSSAttr( computed, "position" ) === "fixed" ) {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
    } else {
        offset = getOffset(elem);

        // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;

        while ( offsetParent &&
        ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
        getCSSAttr( this.getComputedStyle(offsetParent), "position" ) === "static" ) {
            offsetParent = offsetParent.parentNode;
        }
        if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

            const computedOffsetParent = this.getComputedStyle(offsetParent);

            // Incorporate borders into its offset, since they are outside its content origin
            parentOffset = getOffset(offsetParent);
            parentOffset.top += getCSSAttrNumeric( computedOffsetParent, "borderTopWidth");
            parentOffset.left += getCSSAttrNumeric( computedOffsetParent, "borderLeftWidth");
        }
    }

    // Subtract parent offsets and element margins
    return {
        top: offset.top - parentOffset.top - getCSSAttrNumeric(computed, "marginTop"),
        left: offset.left - parentOffset.left - getCSSAttrNumeric(computed, "marginLeft")
    };
}

export function setOffset(elem, options) {
    const computed = getComputedStyle(elem);
    const position = getCSSAttr(computed, "position");
    const props = {top: 0, left: 0};

    // Set position first, in-case top/left are set even on static elem
    if (position === "static") {
        elem.style.position = "relative";
    }

    const curOffset = getOffset(elem);
    const curCSSTop = getCSSAttr(computed, "top");
    const curCSSLeft = getCSSAttr(computed, "left");
    const calculatePosition = ( position === "absolute" || position === "fixed" ) &&
        ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

    // Need to be able to calculate position if either
    // top or left is auto and position is either absolute or fixed
    let curPosition, curLeft, curTop;
    if (calculatePosition) {
        curPosition = getElementPosition(elem, computed);
        curTop = curPosition.top;
        curLeft = curPosition.left;
    } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
    }

    //eslint-disable-next-line eqeqeq
    if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
    }
    //eslint-disable-next-line eqeqeq
    if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
    }

    elem.style.posLeft = Math.round(props.left);
    elem.style.posTop = Math.round(props.top);
}


///////////////////////////





export default class CoreTooltip extends React.Component {
    static propTypes = {
        placement: PropTypes.oneOf(["bottom", "top", "right", "left"]),
        title: PropTypes.node.isRequired,
        visible: PropTypes.bool,
        className: PropTypes.string,
        trigger: PropTypes.oneOf(["hover", "click"])
    };

    static defaultProps = {
        placement: "top",
        className: "tooltip",
        trigger: "hover"
    };

    constructor(props) {
        super(props);

        this.state = {
            shouldShow: false,
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

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.toCamelCase(this.props.namespace || this.context.namespace);
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }

    getActionProps() {
        if (this.props.visible != null) {
            return {};
        }

        if (this.props.trigger === "click") {
            return {
                onClick: () => this.setState({shouldShow: !this.state.shouldShow})
            };
        }

        return {
            onMouseOver: () => this.setState({shouldShow: true}),
            onMouseOut: () => this.setState({shouldShow: false})
        };
    }

    getPosition(el) {
        let isBody = el.tagName === "BODY";
        let {bottom, height, left, right, top, width} = el.getBoundingClientRect();
        if (width == null) {
            // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
            width = right - left;
            height = bottom - top;
        }

        if (isBody) {
            width = window.innerWidth;
            height = window.innerHeight;
        }

        if (isBody) {
            top = 0;
            left = 0;
        } else {
            const offset = getOffset(el);
            top = offset.top;
            left = offset.left;
        }

        return {
            width, height, top, left,
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : getScrollTop(el)
        };
    }

    getCalculatedOffset(placement, pos, actualWidth, actualHeight) {
        return {
            left: pos.left + pos.width / 2 - actualWidth / 2,
            top: placement === "bottom" ? pos.top + pos.height : pos.top - actualHeight
        };
    }

    placeTooltip(tooltipNode, reference) {
        // Only support bottom and top on old IE
        const placement = this.props.placement === "bottom" ? "bottom" : "top";
        tooltipNode.setAttribute("data-placement", placement);

        let pos = this.getPosition(reference);
        let actualWidth = tooltipNode.offsetWidth;
        let actualHeight = tooltipNode.offsetHeight;
        let height = actualHeight;

        let offset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

        const computed = getComputedStyle(tooltipNode);
        offset.top += getCSSAttrNumeric(computed, "marginTop");
        offset.left += getCSSAttrNumeric(computed, "marginLeft");

        setOffset(tooltipNode, offset);

        // check to see if placing tip in new offset caused the tip to resize itself
        actualHeight = tooltipNode.offsetHeight;
        if (placement === "top" && actualHeight !== height) {
            offset.top = offset.top + height - actualHeight;
            setOffset(tooltipNode, offset);
        }

        // place arrow
        const arrow = ReactDOM.findDOMNode(this.refs["arrow"]);
        arrow.style.left = "" + Math.floor(actualWidth / 2 - arrow.offsetWidth / 2);
    }

    componentDidUpdate() {
        if (this.isVisible() && isIE9OrBelow() && this.refs["popper"]) {
            this.placeTooltip(ReactDOM.findDOMNode(this.refs["popper"]), ReactDOM.findDOMNode(this.refs["content"]));
        }
    }

    componentDidMount() {
        if (this.isVisible() && isIE9OrBelow() && this.refs["popper"]) {
            this.placeTooltip(ReactDOM.findDOMNode(this.refs["popper"]), ReactDOM.findDOMNode(this.refs["content"]));
        }
    }

    renderTooltip(className, props, title) {
        let PopperComponent = Popper;
        let arrow = <Arrow>
            {({arrowProps}) => <span className={this.classes("Tooltip__arrow")} {...arrowProps} />}
        </Arrow>;

        if (isIE9OrBelow()) {
            PopperComponent = "div";
            arrow = <span ref="arrow" className={this.classes("Tooltip__arrow")} />;
            // only accept bottom and top in IE
            props.placement = props.placement === "bottom" ? "bottom" : "top";
            props["data-placement"] = props.placement;
            props["ref"] = "popper";
        }

        const content = (
            <PopperComponent role="tooltip" className={this.classes("Tooltip", className)} {...props}>
                <div className={this.classes("Tooltip__inner")}>{title}</div>
                {arrow}
            </PopperComponent>
        );

        return isIE9OrBelow() ? content : <Portal>{content}</Portal>;
    }

    isVisible() {
        return this.props.visible === true || this.state.shouldShow;
    }

    render() {
        const {children, visible, title, className, trigger, ...props} = this.props;

        const moreProps = {};
        let ManagerComponent = Manager;
        let TargetComponent = Target;
        if (isIE9OrBelow()) {
            ManagerComponent = "span";
            TargetComponent = "span";
            moreProps["ref"] = "content";
        }

        return (
            <ManagerComponent component="span" style={{display: "inline-block"}} {...moreProps}>
                <TargetComponent component="span"
                                 style={{display: "inline-block"}} {...this.getActionProps()}>
                    {children}
                </TargetComponent>
                {this.isVisible() && this.renderTooltip(className, props, title)}
            </ManagerComponent>
        );
    }
}
