import React from 'react';
import CoreForm from "./CoreForm";
import CoreFormItem from "./CoreFormItem";
import CoreRadio from "../switch/CoreRadio";
import CoreCheckbox from "../switch/CoreCheckbox";
import CoreSelect from "../switch/CoreSelect";
import CoreTextarea from "../textFields/CoreTextarea";
import CoreInput from "../textFields/CoreInput";

class Forms extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block">
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

                <CoreForm horizontal>
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
                    <CoreFormItem label="Input)label" errorMessage="Your text is too short" hasError>
                        <CoreInput placeholder="placeholder and max length" maxLength={4}/>
                    </CoreFormItem>
                </CoreForm>
            </div>

        </div>;
    }
}

export default Forms;
