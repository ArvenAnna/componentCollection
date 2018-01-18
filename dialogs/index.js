import React from 'react';
import CoreDialog, {CoreDialogContent, CoreDialogFooter, CoreDialogHeader} from "./CoreDialog";

class Dialogs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstOpen: false,
            secondOpen: false
        }
    }

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">

            <div className="element_block">
                <button onClick={() => this.setState({firstOpen: true})}>open dialog</button>
                <CoreDialog {...(this.state.firstOpen ? {open: true} : '')} onClose={() => this.setState({firstOpen: false})}>
                    {(close) => {
                        return <div>
                            <CoreDialogHeader>
                                <h1>Title</h1>
                                <h2 level="2" size="small">Subtitle</h2>
                                {close}
                            </CoreDialogHeader>
                            <CoreDialogContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam amet eum, facilis exercitationem quisquam deleniti dolorem quod. Repellat cum quia atque fugiat, quam neque. Aut doloribus aliquid aspernatur accusamus, quas!</CoreDialogContent>
                            <CoreDialogFooter>
                                <button>Agree</button>
                            </CoreDialogFooter>
                        </div>
                    }}
                </CoreDialog>

                <button onClick={() => this.setState({secondOpen: true})}>open dialog</button>
                <CoreDialog {...(this.state.secondOpen ? {open: true} : '')} onClose={() => this.setState({secondOpen: false})} backdrop>
                    {(close) => {
                        return <div>
                            <CoreDialogHeader>
                                <h1>Title</h1>
                                <h2 level="2" size="small">Subtitle</h2>
                                {close}
                            </CoreDialogHeader>
                            <CoreDialogContent>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam amet eum, facilis exercitationem quisquam deleniti dolorem quod. Repellat cum quia atque fugiat, quam neque. Aut doloribus aliquid aspernatur accusamus, quas!</CoreDialogContent>
                            <CoreDialogFooter>
                                <button>Agree</button>
                            </CoreDialogFooter>
                        </div>
                    }}
                </CoreDialog>
            </div>

        </div>;
    }
}

export default Dialogs;
