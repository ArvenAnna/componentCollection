import React from 'react';
import CryptoSlider from "./CryptoSlider";


class Sliders extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        const cryptoSlides = [{
            title: 'slide1',
            content: ['par1', 'par2']
        }, {
            title: 'slide2',
            content: ['par1']
        }, {
            title: 'slide2',
            content: ['par1', 'par2']
        }];
        return <div className="element_block_container">

            <div className="element_block crypto_bg">
                <CryptoSlider slides={cryptoSlides}/>

            </div>

        </div>;
    }
}

export default Sliders;