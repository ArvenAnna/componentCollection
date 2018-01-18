import * as React from "react";
import * as PropTypes from "prop-types";

export default class CoreRadioGroup extends React.Component {

    static defaultProps = {
        Component: "div"
    };

    static childContextTypes = {
        radioGroup: PropTypes.object
    };

    static propTypes = {
        name: PropTypes.string,
        selectedValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
        onChange: PropTypes.func,
        children: PropTypes.node.isRequired,
        Component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
            PropTypes.object,
        ])
    };

    getChildContext() {
        return {
            radioGroup: {
                name: this.props.name,
                selectedValue: this.props.selectedValue,
                onChange: this.props.onChange
            }
        };
    }

    render() {
        const {Component, name, selectedValue, onChange, ...rest} = this.props;
        return <Component {...rest} />;
    }
}
