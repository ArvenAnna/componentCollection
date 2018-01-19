import React from 'react';
import CoreSwitchControl from "./CoreSwitchControl";
import CoreCheckbox from "./CoreCheckbox";
import CryptoCheckbox from "./CryptoCheckbox";
import CoreSelect from "./CoreSelect";
import CoreRadio from "./CoreRadio";
import CoreRadioGroup from "./CoreRadioGroup";
import CoreDropdown from "./CoreDropdown";
import {CoreMenu, CoreMenuDivider, CoreMenuHeader, CoreMenuItem} from "./coreDropdownMenu/CoreMenu";

class Switchers extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <CoreSwitchControl>without props</CoreSwitchControl>
                <CoreSwitchControl disabled>disabled</CoreSwitchControl>
                <CoreSwitchControl defaultChecked={true}>defaultChecked</CoreSwitchControl>
                <CoreSwitchControl checked={true}>checked</CoreSwitchControl>
                <CoreSwitchControl checked={false}>checked false</CoreSwitchControl>
            </div>
            <div className="element_block">
                <CoreCheckbox>without props</CoreCheckbox>
                <CoreCheckbox disabled>disabled</CoreCheckbox>
                <CoreCheckbox defaultChecked={true}>defaultChecked</CoreCheckbox>
                <CoreCheckbox checked={true}>checked</CoreCheckbox>
                <CoreCheckbox checked={false}>checked false</CoreCheckbox>
            </div>
            <div className="element_block crypto_bg">
                <CryptoCheckbox>without props</CryptoCheckbox>
                {/*<CryptoCheckbox disabled>disabled</CryptoCheckbox>*/}
                {/*<CryptoCheckbox defaultChecked={true}>defaultChecked</CryptoCheckbox>*/}
                {/*<CryptoCheckbox checked={true}>checked</CryptoCheckbox>*/}
                {/*<CryptoCheckbox checked={false}>checked false</CryptoCheckbox>*/}
            </div>
            <div className="element_block core_margin" style={{width: '200px'}}>
                <CoreSelect options={{'1': 'simple', '2': 'selected'}} selectedOptionValue='2' onChange={() => {}} level='info' size='small' />
                <CoreSelect options={{'1': 'large', '2': 'name2'}} level='warning' size='large' onChange={() => {}}/>
                <CoreSelect options={{'1': 'error', '2': 'name2'}} level='error' onChange={() => {}}/>
                <CoreSelect options={{'1': 'active', '2': 'name2'}} level='success' active={true} onChange={() => {}}/>
                <CoreSelect options={{'1': 'disabled', '2': 'name2'}} disabled={true} loading={true} onChange={() => {}}/>
            </div>
            <div className="element_block core_margin">
                <CoreRadio name="options" value="1">Single</CoreRadio>
                <CoreRadio className="Radio--button" name="radio-02" value="1">Button styled</CoreRadio>
                <CoreRadio name="radio-disabled" value="1" disabled>Disabled</CoreRadio>

                <CoreRadioGroup selectedValue="name2" name="options" onChange={() => {}} style={{marginTop: '10px'}}>
                    <CoreRadio value="name2" onChange={() => {}} disabled={true}>disabled</CoreRadio>
                    <CoreRadio value="name2" onChange={() => {}} checked={true}>checked</CoreRadio>
                    <CoreRadio value="name3" onChange={() => {}} defaultChecked={false}>option3</CoreRadio>
                </CoreRadioGroup>
                <CoreRadioGroup name="options3" onChange={() => {}} style={{margin: '5px'}}>
                    <CoreRadio value="name8" onChange={() => {}}>option1</CoreRadio>
                    <CoreRadio value="name9" onChange={() => {}}>option2</CoreRadio>
                    <CoreRadio value="name0" onChange={() => {}} defaultChecked={true}>default checked</CoreRadio>
                </CoreRadioGroup>
            </div>


            <div className="element_block core_margin">
                <CoreDropdown trigger={(isOpen, Caret) => <span>Dropdown {Caret}</span>}>
                    <CoreMenu>
                        <CoreMenuHeader>00</CoreMenuHeader>
                        <CoreMenuItem>00-01 - FooBarBaz</CoreMenuItem>
                        <CoreMenuItem>00-02 - FooBarBaz</CoreMenuItem>
                        <CoreMenuItem>00-03 - FooBarBaz</CoreMenuItem>
                        <CoreMenuDivider />
                        <CoreMenuHeader>10</CoreMenuHeader>
                        <CoreMenuItem>10-04 - FooBarBaz</CoreMenuItem>
                    </CoreMenu>
                </CoreDropdown>

                <CoreDropdown disabled size="small" trigger={(isOpen, Caret) => <button>Disabled {Caret}</button>}>
                    <CoreMenu block>
                        <CoreMenuHeader>00</CoreMenuHeader>
                        <CoreMenuItem>00-01 - FooBarBaz</CoreMenuItem>
                        <CoreMenuItem>00-02 - FooBarBaz</CoreMenuItem>
                        <CoreMenuItem>00-03 - FooBarBaz</CoreMenuItem>
                        <CoreMenuDivider />
                        <CoreMenuHeader>Image</CoreMenuHeader>
                        <CoreMenuItem><img src="" className="demo-img" />Image-04 - Foo</CoreMenuItem>
                        <CoreMenuItem><img src="" className="demo-img" />Image-05 - Foo</CoreMenuItem>
                        <CoreMenuItem><img src="" className="demo-img" />Image-06 - Foo</CoreMenuItem>
                    </CoreMenu>
                </CoreDropdown>

                <CoreDropdown trigger={(isOpen, Caret) => <a href="#">With submenu {Caret}</a>}>
                    <CoreMenu>
                        <CoreMenuHeader>A</CoreMenuHeader>
                        <CoreMenuItem>ABC</CoreMenuItem>
                        <CoreMenuItem>ADF</CoreMenuItem>
                        <CoreMenuDivider />
                        <CoreMenuHeader>B</CoreMenuHeader>
                        <CoreMenuItem submenu>
                            BCD
                            <CoreMenu>
                                <CoreMenuItem>BCD-ABD123</CoreMenuItem>
                                <CoreMenuItem submenu>
                                    BCD-ABD125
                                    <CoreMenu>
                                        <CoreMenuItem>BCD-ABD125-X</CoreMenuItem>
                                        <CoreMenuItem>BCD-ABD125-Y</CoreMenuItem>
                                    </CoreMenu>
                                </CoreMenuItem>
                            </CoreMenu>
                        </CoreMenuItem>
                        <CoreMenuItem>BEF</CoreMenuItem>
                    </CoreMenu>
                </CoreDropdown>

            </div>

        </div>;
    }
}

export default Switchers;

//todo we have icon uncapsulated to the dropdown