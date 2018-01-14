import React from 'react';
import CryptoTabs from './CryptoTabs';

class Tabs extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block crypto_bg">
                <CryptoTabs tabs={["Register", "Login"]} activeIndex={1}/>
            </div>
        </div>;
    }
}

export default Tabs;
