import * as React from "react";
import * as PropTypes from "prop-types";
import CoreFormItem from "./coreForms/CoreFormItem";
import CoreFormAddon from "./coreForms/CoreFormAddon";
import CoreInput from "./CoreInput";
import CoreForm from "./coreForms/CoreForm";

export default class CoreFullInput extends React.Component {

    static propTypes = {//
        "id": PropTypes.string, //
        "value": PropTypes.string, //
        "defaultValue": PropTypes.string, //
        "placeholder": PropTypes.string, //
        "type": PropTypes.string, //
        "name": PropTypes.string, //
        "maxLength": PropTypes.number, //

        "disabled": PropTypes.bool, //
        "readOnly": PropTypes.bool, //
        "horizontal": PropTypes.bool,

        "onChange": PropTypes.func, //
        "onFocus": PropTypes.func, //
        "onBlur": PropTypes.func, //
        "onKeyDown": PropTypes.func, //

        "className": PropTypes.string, //
        "size": PropTypes.oneOf(["small", "large"]),
        "label": PropTypes.string
    };


    constructor(props) {
        super(props);
    }

    render() {
        let coreItemProps = {
            htmlFor: this.props.name || 'input',
            label: this.props.label,
            errorMessage: this.props.errorMessage
        }
        if (this.props.before || this.props.after) {
            coreItemProps.addons = true;
        }
        if (this.props.iconBefore || this.props.iconAfter) {
            coreItemProps.icons = true;
        }
        if (this.props.hasError || this.props.errorMessage) {
            coreItemProps.hasError = true;
            coreItemProps.required = true;
        }

        let coreFormProps = {};
        if (this.props.horizontal) {
            coreFormProps.horizontal = true;
        }

        return <CoreForm {...coreFormProps}><CoreFormItem {...coreItemProps}>
            {this.props.before && <CoreFormAddon>{this.props.before}</CoreFormAddon>}
            {this.props.iconBefore && <div className="Icon">{this.props.iconBefore}</div>}
            <CoreInput
                id={this.props.id}
                value={this.props.value}
                defaultValue={this.props.defaultValue}
                type={this.props.type}
                name={this.props.name || 'input'}
                maxLength={this.props.maxLength}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                onChange={this.props.onChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.props.onKeyDown}
                className={this.props.className}
                size={this.props.size}
                placeholder={this.props.placeholder}/>
            {this.props.iconAfter && <div className="Icon">{this.props.iconAfter}</div>}
            {this.props.after && <CoreFormAddon>{this.props.after}</CoreFormAddon>}
        </CoreFormItem></CoreForm>
    }
}

//todo: before and after addons make as array to use :

{/*<FormItem label="Input label" htmlFor="input-06" addons>*/}
    {/*<FormAddon>$</FormAddon>*/}
    {/*<FormAddon>$</FormAddon>*/}
    {/*<FormAddon>$</FormAddon>*/}
    {/*<Input name="input-06" placeholder="Input placeholder" />*/}
    {/*<FormAddon>%</FormAddon>*/}
    {/*<FormAddon>%</FormAddon>*/}
{/*</FormItem>*/}

//todo: make input with button form like:
{/*<Form action="">*/}
    {/*<FormItem label="Input label" htmlFor="input-01">*/}
        {/*<Input name="input-01" placeholder="Input placeholder" />*/}
    {/*</FormItem>*/}
    {/*<FormActions>*/}
        {/*<Button>Send</Button>*/}
    {/*</FormActions>*/}
{/*</Form>*/}

//todo: use wrapper CoreForms separetely in order to use multiple Form Elements in it

