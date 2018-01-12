import React from 'react';
import * as PropTypes from "prop-types";
import Checkbox from "./Checkbox";
import './_SwitchControl.less';


class SwitchControl extends React.Component {

    //public static displayName = "Switch";

    // public static propTypes = {//
    //     "name": PropTypes.string, //
    //     "defaultChecked": PropTypes.bool, //
    //     "checked": PropTypes.bool, //
    //     "onChange": PropTypes.func, //
    //     "disabled": PropTypes.bool, //
    //     "className": PropTypes.string //
    // };

    render() {
        return <Checkbox isSwitch {...this.props} />;
    }
}

export default SwitchControl;