import React from 'react';
import CryptoTabs from './CryptoTabs';
import CoreTabs, {CoreTabsPanel} from './CoreTabs';
import {CoreNavItem} from "./CoreNav";
import CoreNav from "./CoreNav";

class Tabs extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block crypto_bg">
                <CryptoTabs tabs={["Register", "Login"]} activeIndex={1}/>
            </div>

            <div className="element_block">
                <CoreTabs>
                    <CoreTabsPanel title="Tab 1">
                        <h3>Tab 1</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3" disabled>
                        <h3>Tab 3</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>

                <CoreTabs position="bottom">
                    <CoreTabsPanel title="Tab 1">
                        <h3>Tab 1</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3" hidden>
                        <h3>Tab 3</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>

                <CoreTabs block>
                    <CoreTabsPanel title="Tab 1">
                        <h3>Tab 1</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3">
                        <h3>Tab 3</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>

                <CoreTabs variant="loud">
                    <CoreTabsPanel title="Tab 1">
                        <h3>Tab 1</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3">
                        <h3>Tab 3</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>
            </div>

            <div className="element_block">
                <CoreNav size="small">
                    <CoreNavItem href="#">Item1</CoreNavItem>
                    <CoreNavItem href="#" active>Item2</CoreNavItem>
                    <CoreNavItem href="#">Item3</CoreNavItem>
                </CoreNav>
                <CoreNav horizontal>
                    <CoreNavItem href="#">Item1</CoreNavItem>
                    <CoreNavItem href="#">Item2</CoreNavItem>
                    <CoreNavItem href="#">Item3</CoreNavItem>
                </CoreNav>
                <CoreNav size="large" loud>
                    <CoreNavItem href="#">Item 1</CoreNavItem>
                    <CoreNavItem href="#">Item 2</CoreNavItem>
                    <CoreNavItem href="#">Item 3</CoreNavItem>
                </CoreNav>
                <CoreNav disabled>
                    <CoreNavItem href="#">Item 1</CoreNavItem>
                    <CoreNavItem href="#">Item 2</CoreNavItem>
                    <CoreNavItem href="#">Item 3</CoreNavItem>
                </CoreNav>
                <CoreNav hoverable>
                    <CoreNavItem href="#">Item 1</CoreNavItem>
                    <CoreNavItem href="#">Item 2</CoreNavItem>
                    <CoreNavItem>
                        <CoreNav>
                            <CoreNavItem href="#">Item 2 - 1</CoreNavItem>
                            <CoreNavItem href="#">Item 2 - 2</CoreNavItem>
                            <CoreNavItem href="#">Item 2 - 3</CoreNavItem>
                        </CoreNav>
                    </CoreNavItem>
                    <CoreNavItem href="#">Item 3</CoreNavItem>
                </CoreNav>
            </div>

        </div>;
    }
}

export default Tabs;
