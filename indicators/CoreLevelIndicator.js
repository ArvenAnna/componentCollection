import * as React from "react";
import * as PropTypes from "prop-types";
import './_CoreLevelIndicator.less';

const repeatIntoArray = (count, val) => {

    const returnArray = [];

    for (let i = 0; i < count; i++) {
        returnArray.push(
            typeof val === "function" ? val(i) : val
        );
    }

    return returnArray;
};

export default class CoreLevelIndicator extends React.Component {

    static propTypes = {
        "className": PropTypes.string,
        "size": PropTypes.oneOf([
            "xsmall",
            "small",
            "medium",
            "large",
            "xlarge"
        ]),
        "filledElement": PropTypes.any.isRequired,
        "halfFilledElement": PropTypes.any,
        "emptyElement": PropTypes.any.isRequired,
        "isDiscrete": PropTypes.bool,
        "currentValue": PropTypes.number.isRequired,
        "maxValue": PropTypes.number.isRequired,
        "legendTop": PropTypes.element,
        "legendBottom": PropTypes.element
    };

    static defaultProps = {
        "size":"medium"
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

        const {
            filledElement,
            halfFilledElement,
            emptyElement,
            isDiscrete,
            currentValue,
            maxValue,
            legendTop,
            legendBottom,
            size
        } = this.props;

        const className = this.classes(
            "LevelIndicator",
            this.props.className
        );

        const isCurrentValueMoreThanZero = currentValue > 0;
        const isCurrentValueLessThanMaxValue = currentValue < maxValue;
        const doesCurrentValueHaveDecimals = (currentValue - Math.floor(currentValue)) > 0;
        const showHalfFilledElement = isDiscrete && halfFilledElement && doesCurrentValueHaveDecimals && isCurrentValueLessThanMaxValue && isCurrentValueMoreThanZero;

        const numberOfEmptyElementsToShow = isDiscrete
            ? maxValue - Math.floor(currentValue) - (showHalfFilledElement ? 1 : 0)
            : 0;

        const numberOfFilledElementsToShow = Math.min(Math.floor(currentValue), maxValue);

        return (
            <div className={className}>
                {legendTop}

                {
                    isDiscrete
                        ? <div>
                            {repeatIntoArray(numberOfFilledElementsToShow, filledElement)}

                            {
                                showHalfFilledElement && halfFilledElement
                            }

                            {repeatIntoArray(numberOfEmptyElementsToShow, emptyElement)}
                        </div>

                        : <div className={this.classes(
                            "LevelIndicator__barWrapper",
                            "LevelIndicator__barWrapper--" + size
                        )}>
                            {
                                typeof emptyElement === "function"
                                    ? emptyElement(100)
                                    : emptyElement
                            }
                            {
                                typeof filledElement === "function"
                                    ? filledElement(Math.round(currentValue / maxValue * 100))
                                    : filledElement
                            }
                        </div>
                }

                {legendBottom}
            </div>
        );
    }
}

export class CoreLevelIndicatorFillBar extends React.Component {
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

        const {namespace, className, width, ...props} = this.props;

        return (
            <div
                {...props}
                className={this.classes("LevelIndicator__bar", "LevelIndicator__bar--fill", className)}>
                <div
                    className="LevelIndicator__bar--innerfill"
                    style={{width: width + "%"}}/>
            </div>
        );
    }
}


export class LevelIndicatorEmptyBar extends React.Component {
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

        return (
            <div
                {...props}
                className={this.classes("LevelIndicator__bar", "LevelIndicator__bar--empty", className)}
            />
        );
    }
}