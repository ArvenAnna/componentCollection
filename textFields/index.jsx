import React from 'react';
import CryptoTextField from './CryptoTextField';
import PasswordField from './CryptoPasswordField';
import CryptoTextInput from './CryptoTextInput';
import CoreInput from "./CoreInput";
import CoreFullInput from "./CoreFullInput";
import Magnifier from '../svg/magnifier.svg';
import CoreTextarea from "./CoreTextarea";
import CoreForm from "./coreForms/CoreForm";
import CoreFormItem from "./coreForms/CoreFormItem";
import CoreCheckbox from "../switch/CoreCheckbox";
import CoreRadio from "../switch/CoreRadio";
import CoreSelect from "../switch/CoreSelect";

class TextFields extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block crypto_bg">
                <CryptoTextField placeholder="with placeholder"/>
                <CryptoTextField value="with value and disabled" disabled={true}/>
                <CryptoTextField value="with error" error="error"/>
            </div>
            <div className="element_block crypto_bg">
                <PasswordField placeholder="with placeholder"/>
                <PasswordField defaultValue="with value and disabled" disabled={true}/>
                <PasswordField defaultValue="with error" error="error"/>
            </div>
            <div className="element_block crypto_bg">
                <CryptoTextInput placeholder="with placeholder"/>
                <CryptoTextInput defaultValue="with value and disabled" disabled={true}/>
                <CryptoTextInput defaultValue="with error" error="error"/>
            </div>
            <div className="element_block core_margin">
                <CoreInput readOnly={true} defaultValue="read only"/>
                <CoreInput placeholder="placeholder and max length" maxLength={4}/>
                <CoreInput disabled={true} value="disabled" onChange={() => {}}/>
                <CoreInput size="large"/>
            </div>
            <div className="element_block core_margin">
                <CoreFullInput readOnly={true} defaultValue="read only" before='$' after='%' label="Input label"/>
                <CoreFullInput placeholder="placeholder" iconBefore={<Magnifier/>} iconAfter={<Magnifier/>}/>
                <CoreFullInput value="value" errorMessage="some error occurs" onChange={() => {}}/>
                <CoreFullInput value="value" hasError={true} onChange={() => {}}/>
                <CoreFullInput value="value" label="Horizontal input" onChange={() => {}} horizontal={true}/>
            </div>
            <div className="element_block core_margin">
                <CoreForm>
                    <CoreFormItem label="Checkboxes" errorMessage="You must agree to the Terms &amp; Services" hasError>
                         <CoreCheckbox name="agree">I agree to the Terms &amp; Services</CoreCheckbox>
                         </CoreFormItem>
                     <CoreFormItem label="Radio buttons" errorMessage="You must choose one option" hasError>
                     <CoreRadio name="radio-01" value="1">Option 1</CoreRadio>
                     <CoreRadio name="radio-02" value="2">Option 2</CoreRadio>
                     </CoreFormItem>
                     <CoreFormItem label="Select with error" errorMessage="You must choose one option" hasError>
                     <CoreSelect options={{"0": "Select Field", "1": "Option 01", "2": "Option 02"}} />
                     </CoreFormItem>
                     <CoreFormItem label="Textarea label" errorMessage="Your text is too short" hasError>
                     <CoreTextarea name="textarea-01" placeholder="Textarea placeholder" />
                         </CoreFormItem>
                </CoreForm>
            </div>
            <div className="element_block core_margin">
                <CoreTextarea readOnly={true} defaultValue="read only" size="small" style={{margin: '5px'}}/>
                <CoreTextarea placeholder="placeholder" size="large" style={{margin: '5px'}}/>
                <CoreTextarea value="value" disabled={true} style={{margin: '5px'}} onChange={() => {}}/>
                <CoreTextarea value="value" maxLength={4} style={{margin: '5px'}} onChange={() => {}}/>
            </div>
        </div>;
    }


    //todo: make full components
// <FormItem label="Checkboxes" errorMessage="You must agree to the Terms &amp; Services" hasError>
// <Checkbox name="agree">I agree to the Terms &amp; Services</Checkbox>
// </FormItem>
// <FormItem label="Radio buttons" errorMessage="You must choose one option" hasError>
// <Radio name="radio-01" value="1">Option 1</Radio>
// <Radio name="radio-02" value="2">Option 2</Radio>
// </FormItem>
// <FormItem label="Select with error" errorMessage="You must choose one option" hasError>
// <Select options={{"0": "Select Field", "1": "Option 01", "2": "Option 02"}} />
// </FormItem>
// <FormItem label="Textarea label" errorMessage="Your text is too short" hasError>
// <Textarea name="textarea-01" placeholder="Textarea placeholder" />
//     </FormItem>
}

export default TextFields;
