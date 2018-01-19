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

            <div className="element_block" style={{width: '300px'}}>
                <CoreTabs style={{marginBottom: '30px'}}>
                    <CoreTabsPanel title="Tab 1">
                        <h3>Tab content</h3>
                        <p>Tab1 content ...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab2 content</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3" disabled>
                        <h3>Disabled tab</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>

                <CoreTabs block style={{marginBottom: '30px'}}>
                    <CoreTabsPanel title="Tab 1">
                        <h3>Block tabs</h3>
                        <p>Tab 1 content...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2 content</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3">
                        <h3>Tab 3 content</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>

                <CoreTabs variant="loud" style={{marginBottom: '30px'}}>
                    <CoreTabsPanel title="Tab 1">
                        <h3>Loud tabs</h3>
                        <p>Tab1 content...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2 content</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3">
                        <h3>Tab 3 content</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>

                <CoreTabs position="bottom">
                    <CoreTabsPanel title="Tab 1">
                        <h3>Bottom tabs</h3>
                        <p>Tab 1 content...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 2">
                        <h3>Tab 2 content</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                    <CoreTabsPanel title="Tab 3" hidden>
                        <h3>Tab 3</h3>
                        <p>Lorem ipsum...</p>
                    </CoreTabsPanel>
                </CoreTabs>
            </div>

            <div className="element_block">
                <CoreNav size="small">
                    <CoreNavItem href="#">Item1</CoreNavItem>
                    <CoreNavItem href="#" active>Active item 2</CoreNavItem>
                    <CoreNavItem href="#">Item3</CoreNavItem>
                </CoreNav>
                <CoreNav disabled>
                    <CoreNavItem href="#">Disabled 1</CoreNavItem>
                    <CoreNavItem href="#">Disabled 2</CoreNavItem>
                    <CoreNavItem href="#">Disabled 3</CoreNavItem>
                </CoreNav>
                <CoreNav size="large" loud>
                    <CoreNavItem href="#">Loud 1</CoreNavItem>
                    <CoreNavItem href="#">Loud 2</CoreNavItem>
                    <CoreNavItem href="#">Loud 3</CoreNavItem>
                </CoreNav>
                <CoreNav hoverable>
                    <CoreNavItem href="#">Hoverable 1</CoreNavItem>
                    <CoreNavItem href="#">Hoverable 2</CoreNavItem>
                    <CoreNavItem>
                        <CoreNav>
                            <CoreNavItem href="#">subitem 2 - 1</CoreNavItem>
                            <CoreNavItem href="#">subitem 2 - 2</CoreNavItem>
                            <CoreNavItem href="#">subitem 2 - 3</CoreNavItem>
                        </CoreNav>
                    </CoreNavItem>
                    <CoreNavItem href="#">Hoverable 3</CoreNavItem>
                </CoreNav>
                <CoreNav horizontal>
                    <CoreNavItem href="#">Horizontal 1</CoreNavItem>
                    <CoreNavItem href="#">Horizontal 2</CoreNavItem>
                    <CoreNavItem href="#">Horizontal 3</CoreNavItem>
                </CoreNav>
            </div>

        </div>;
    }
}

export default Tabs;
