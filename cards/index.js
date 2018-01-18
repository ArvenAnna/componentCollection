import React from 'react';
import CoreCard, {CoreCardActions, CoreCardFooter, CoreCardHeader, CoreCardItem, CoreCardMedia, CoreCardMenu} from "./CoreCard";
import CorePanel from "./CorePanel";

class Cards extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <CoreCard style={{margin: '5px'}}>
                    <CoreCardItem href="#">A simple card.</CoreCardItem>
                </CoreCard>

                <CoreCard style={{margin: '5px'}}>
                    <CoreCardMedia src="../img/download.jpg" alt="..." />
                    <CoreCardItem>
                        <h1 size="large">Quick introduction</h1>
                    </CoreCardItem>
                    <CoreCardItem>
                        <p>Swissquote Group Holding Ltd and its subsidiaries provide Online Financial Services that mainly consist of the services provided by Swissquote Bank Ltd through its financial web portal www.swissquote.ch.</p>
                    </CoreCardItem>
                    <CoreCardActions>
                        <button variant="text">Share</button>
                        <button variant="text">View report</button>
                    </CoreCardActions>
                </CoreCard>

                <CoreCard style={{margin: '5px'}}>
                    <CoreCardHeader>
                        <h1 size="large">Swissquote</h1>
                        <h3>SQN</h3>
                        <CoreCardMenu />
                    </CoreCardHeader>
                    <CoreCardMedia src="../img/download.jpg" alt="...">
                        <h1 size="large">Annual Report</h1>
                        <h3>First half of 2015</h3>
                    </CoreCardMedia>
                    <CoreCardItem>
                        <h1>About</h1>
                        <h2 size="large">Quick introduction</h2>
                    </CoreCardItem>
                    <CoreCardItem>
                        <p>Swissquote Group Holding Ltd and its subsidiaries provide Online Financial Services that mainly consist of the services provided by Swissquote Bank Ltd through its financial web portal www.swissquote.ch.</p>
                    </CoreCardItem>
                    <CoreCardActions>
                        <button variant="text">Share</button>
                        <button variant="text">View report</button>
                    </CoreCardActions>
                    <CoreCardFooter>©  2016 Swissquote Bank</CoreCardFooter>
                </CoreCard>

            </div>

            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <CorePanel title="Your title here" size="xsmall">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" size="small">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" size="medium">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" size="large">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" size="xlarge">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" level="info">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" level="success">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" level="warning">
                    Your content here
                </CorePanel>
                <CorePanel title="Your title here" level="error">
                    Your content here
                </CorePanel>
            </div>

        </div>;
    }
}

export default Cards;

