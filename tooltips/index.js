import React from 'react';
import CoreTooltip from "./CoreTooltip";

class Tooltips extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block">
                <CoreTooltip title="tooltip content" placement="bottom"><span>wrapped element</span></CoreTooltip>
            </div>

        </div>;
    }
}

export default Tooltips;
