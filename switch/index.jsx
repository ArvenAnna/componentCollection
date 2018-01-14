import React from 'react';
import SwitchControl from "./SwitchControl";
import Checkbox from "./Checkbox";
import CryptoCheckbox from "./CryptoCheckbox";

class Switchers extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <SwitchControl>without props</SwitchControl>
                <SwitchControl disabled>disabled</SwitchControl>
                <SwitchControl defaultChecked={true}>defaultChecked</SwitchControl>
                <SwitchControl checked={true}>checked</SwitchControl>
                <SwitchControl checked={false}>checked false</SwitchControl>
            </div>
            <div className="element_block">
                <Checkbox>without props</Checkbox>
                <Checkbox disabled>disabled</Checkbox>
                <Checkbox defaultChecked={true}>defaultChecked</Checkbox>
                <Checkbox checked={true}>checked</Checkbox>
                <Checkbox checked={false}>checked false</Checkbox>
            </div>
            <div className="element_block ">
                <CryptoCheckbox>without props</CryptoCheckbox>
                {/*<CryptoCheckbox disabled>disabled</CryptoCheckbox>*/}
                {/*<CryptoCheckbox defaultChecked={true}>defaultChecked</CryptoCheckbox>*/}
                {/*<CryptoCheckbox checked={true}>checked</CryptoCheckbox>*/}
                {/*<CryptoCheckbox checked={false}>checked false</CryptoCheckbox>*/}
            </div>
        </div>;
    }
}

export default Switchers;