import React from 'react';
import SwitchControl from "./SwitchControl";
import Checkbox from "./Checkbox";
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
            <div className="element_block crypto_bg">
                <CryptoCheckbox>without props</CryptoCheckbox>
                {/*<CryptoCheckbox disabled>disabled</CryptoCheckbox>*/}
                {/*<CryptoCheckbox defaultChecked={true}>defaultChecked</CryptoCheckbox>*/}
                {/*<CryptoCheckbox checked={true}>checked</CryptoCheckbox>*/}
                {/*<CryptoCheckbox checked={false}>checked false</CryptoCheckbox>*/}
            </div>
            <div className="element_block core_margin" style={{width: '200px'}}>
                <CoreSelect options={{'1': 'name1', '2': 'name2'}} selectedOptionValue='name2' onChange={() => {}} level='info' size='small' />
                <CoreSelect options={{'1': 'name1', '2': 'name2'}} level='warning' size='large' onChange={() => {}}/>
                <CoreSelect options={{'1': 'name1', '2': 'name2'}} level='error' onChange={() => {}}/>
                <CoreSelect options={{'1': 'name1', '2': 'name2'}} level='success' active={true} onChange={() => {}}/>
                <CoreSelect options={{'1': 'name1', '2': 'name2'}} disabled={true} loading={true} onChange={() => {}}/>
            </div>
            <div className="element_block core_margin" style={{width: '200px'}}>
                <CoreRadio name="options" value="1">Option 1</CoreRadio>
                <CoreRadio className="Radio--button" name="radio-02" value="1">Option 1</CoreRadio>
                <CoreRadio name="radio-disabled" value="1" disabled>Option 1</CoreRadio>

                // todo: move to one component
                <CoreRadioGroup selectedValue="name2" name="options" onChange={() => {}}>
                    <CoreRadio value="name2" onChange={() => {}} disabled={true}>option1</CoreRadio>
                    <CoreRadio value="name2" onChange={() => {}} checked={true}>option2</CoreRadio>
                    <CoreRadio value="name3" onChange={() => {}} defaultChecked={false}>option3</CoreRadio>
                </CoreRadioGroup>
                <CoreRadioGroup name="options3" onChange={() => {}}>
                    <CoreRadio value="name8" onChange={() => {}}>option1</CoreRadio>
                    <CoreRadio value="name9" onChange={() => {}}>option2</CoreRadio>
                    <CoreRadio value="name0" onChange={() => {}} defaultChecked={true}>option3</CoreRadio>
                </CoreRadioGroup>
            </div>


            <div className="element_block">
                <CoreDropdown open trigger={(isOpen, Caret) => <span>Dropdown {Caret}</span>}>
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

                <CoreDropdown disabled size="small" trigger={(isOpen, Caret) => <button>Dropdown {Caret}</button>}>
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

                <CoreDropdown open trigger={(isOpen, Caret) => <a href="#">Dropdown {Caret}</a>}>
                    <CoreMenu>
                        <CoreMenuHeader>A</CoreMenuHeader>
                        <CoreMenuItem>ABC</CoreMenuItem>
                        <CoreMenuItem>ADF</CoreMenuItem>
                        <CoreMenuDivider />
                        <CoreMenuHeader>B</CoreMenuHeader>
                        <CoreMenuItem submenu open>
                            BCD
                            <CoreMenu>
                                <CoreMenuItem>BCD-ABD123</CoreMenuItem>
                                <CoreMenuItem submenu open>
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