import React from 'react';
import * as PropTypes from "prop-types";
import Checkbox from "./CoreCheckbox";
import './_CoreSwitchControl.less';

class CoreSwitchControl extends React.Component {

     static propTypes = {
         "name": PropTypes.string,
         "defaultChecked": PropTypes.bool,
         "checked": PropTypes.bool,
         "onChange": PropTypes.func,
         "disabled": PropTypes.bool,
         "className": PropTypes.string
     };

    render() {
        return <Checkbox isSwitch {...this.props} />;
    }
}

export default CoreSwitchControl;