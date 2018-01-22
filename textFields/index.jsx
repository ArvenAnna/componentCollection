import React from 'react';
import CryptoTextField from './CryptoTextField';
import PasswordField from './CryptoPasswordField';
import CryptoTextInput from './CryptoTextInput';
import CoreInput from "./CoreInput";
import CoreTextarea from "./CoreTextarea";

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
                <CoreTextarea readOnly={true} defaultValue="read only" size="small" style={{margin: '5px'}}/>
                <CoreTextarea placeholder="placeholder" size="large" style={{margin: '5px'}}/>
                <CoreTextarea value="value" disabled={true} style={{margin: '5px'}} onChange={() => {}}/>
                <CoreTextarea value="value" maxLength={4} style={{margin: '5px'}} onChange={() => {}}/>
            </div>
        </div>;
    }

}

export default TextFields;
