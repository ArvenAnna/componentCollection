import React from 'react';
import CryptoButton from "./CryptoButton";

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
        </div>;
    }
}

export default Switchers;
