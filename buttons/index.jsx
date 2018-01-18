import React from 'react';
import CryptoButton from "./CryptoButton";
import CoreButton from "./CoreButton";
import CoreButtonGroup from "./CoreButtonGroup";

class Switchers extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block crypto_bg" onClick={() => this.showSwitchControlApi()}>
                <CryptoButton content='button' style={{margin: '5px'}}/>
                <CryptoButton disabled={true} style={{margin: '5px'}} content='disabled'/>
            </div>

            <div className="element_block core_margin" onClick={() => this.showSwitchControlApi()}>
                <CoreButton style={{margin: '5px'}} level='info' size="xsmall" variant="primary">XSmall info primary</CoreButton>
                <CoreButton style={{margin: '5px'}} variant="flat">Flat</CoreButton>
                <CoreButton style={{margin: '5px'}} level='warning' size="small" variant="secondary" active={true}>Small warning secondary</CoreButton>
                <CoreButton style={{margin: '5px', display: 'block'}} disabled={true} loading={true}>disabled loading</CoreButton>
                <CoreButton style={{margin: '5px'}} level='error' size="large" block={true} variant="cta">Large error cta block</CoreButton>
                <CoreButton style={{margin: '5px'}} level='success' size="large" block={true} variant="text">Large success text block</CoreButton>
                <CoreButton style={{margin: '5px'}} level='success' size="large" block={true} variant="flat">Large success flat block</CoreButton>
            </div>

            <div className="element_block core_margin" onClick={() => this.showSwitchControlApi()}>
                <CoreButtonGroup>
                    <CoreButton>Button 1</CoreButton>
                    <CoreButton>Button 2</CoreButton>
                    <CoreButton>Button 3</CoreButton>
                </CoreButtonGroup>

                <CoreButtonGroup>
                    <CoreButton size="large">Button 1</CoreButton>
                    <CoreButton size="large">Button 2</CoreButton>
                    <CoreButton size="large">Button 3</CoreButton>
                </CoreButtonGroup>

                <CoreButtonGroup vertical>
                    <CoreButton>Button 1.1</CoreButton>
                    <CoreButton>Button 1.2</CoreButton>
                    <CoreButton>Button 1.3</CoreButton>
                    <CoreButtonGroup vertical>
                        <CoreButton>Button 2.1</CoreButton>
                        <CoreButton>Button 2.2</CoreButton>
                        <CoreButton>Button 2.3</CoreButton>
                    </CoreButtonGroup>
                </CoreButtonGroup>

            </div>
        </div>;
    }
}

export default Switchers;
