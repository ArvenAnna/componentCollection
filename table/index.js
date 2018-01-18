import React from 'react';
import CoreTable from "./CoreTable";

class Tables extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <CoreTable cols={{"col1": {"label": "column1"}}} data={[{"col1": "vas"}]}/>
            </div>

        </div>;
    }
}

export default Tables;

