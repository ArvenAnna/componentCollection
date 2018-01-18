import React from 'react';
import CoreNotification, {CoreNotificationActions} from "./CoreNotification";
import CoreNotificationAlert from "./CoreNotificationAlert";


class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coreNotificationOpen: false
        }
    }

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <CoreNotification level="info">Info</CoreNotification>
                <CoreNotification level="error">Error</CoreNotification>
                <CoreNotification level="warning">Warning</CoreNotification>
                <CoreNotification level="success">Success</CoreNotification>
                <CoreNotification level="info" onClose={() => { console.log("Clicked on close"); }}>
                    <h1>Some title</h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem fuga vel, aspernatur quas tempore cumque ad labore ullam reiciendis id sequi laudantium similique accusantium sapiente facere. Consequuntur, ipsa autem illo?
                    <CoreNotificationActions>
                        <button>Ipsum</button>
                    </CoreNotificationActions>
                </CoreNotification>
            </div>

            <div className="element_block" onClick={() => this.showSwitchControlApi()}>
                <button onClick={() => this.setState({coreNotificationOpen: true})}>show notification</button>
                <CoreNotificationAlert className={this.state.coreNotificationOpen ? 'is-active' : ''}>
                    <CoreNotification level="success" onClose={() => this.setState({coreNotificationOpen: false})}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem fuga vel, aspernatur quas tempore cumque ad labore ullam reiciendis id sequi laudantium similique accusantium sapiente facere. Consequuntur, ipsa autem illo?
                    </CoreNotification>
                </CoreNotificationAlert>
            </div>

        </div>;
    }
}

export default Notifications;

