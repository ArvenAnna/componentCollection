import React from 'react';
import CryptoTextField from './CryptoTextField';
import PasswordField from './CryptoPasswordField';
import CryptoTextInput from './CryptoTextInput';

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
        </div>;
    }
}

export default TextFields;
