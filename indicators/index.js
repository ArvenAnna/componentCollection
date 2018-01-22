import React from 'react';
import CoreLoader from "./CoreLoader";
import CoreLevelIndicator from "./CoreLevelIndicator";
import CoreProgress from './CoreProgress';

import Star from '../svg/core/star.svg';
import EmptyStar from '../svg/core/star-empty.svg';
import HalfEmptyStar from '../svg/core/star-half-empty.svg';


class Indicators extends React.Component {

    showSwitchControlApi() {
        // or kind of tooltip triggered onClick
    }

    render() {
        return <div className="element_block_container">
            <div className="element_block">
                <div><CoreLoader type="pulse">Loading...</CoreLoader></div>
                <div><CoreLoader type="circle">Loading...</CoreLoader></div>
                <div style={{'margin': '5px'}}><CoreLoader type="linear">Loading...</CoreLoader></div>
                <div style={{'marginLeft': '20px'}}><CoreLoader type="dot">Loading...</CoreLoader></div>
            </div>

            <div className="element_block core_margin">
                <CoreLevelIndicator filledElement='|'
                                    emptyElement={index => <span key={index} style={{color:"#DDD"}}>|</span>}
                                    currentValue={3} maxValue={10} isDiscrete/>
                <CoreLevelIndicator filledElement={index => <Star style={{width: '1rem', height: '1rem'}} key={index}/>}
                                    emptyElement={index => <EmptyStar style={{width: '1rem', height: '1rem'}} key={index}/>}
                                    currentValue={3} maxValue={10} isDiscrete/>
                <CoreLevelIndicator filledElement={index => <Star style={{width: '1rem', height: '1rem'}} key={index}/>}
                                    halfFilledElement={<HalfEmptyStar style={{width: '1rem', height: '1rem'}}/>}
                                    emptyElement={index => <EmptyStar style={{width: '1rem', height: '1rem'}} key={index}/>}
                                    currentValue={3.5} maxValue={10} isDiscrete/>
            </div>

            <div className="element_block" style={{width: '300px'}}>
                <CoreProgress percent={50}>Some text</CoreProgress>
                <CoreProgress percent={25} level="error">Some text</CoreProgress>
                <CoreProgress percent={75} level="warning">Some text</CoreProgress>
                <CoreProgress percent={30} level="info">Some text</CoreProgress>
                <CoreProgress percent={45} level="success">Some text</CoreProgress>
            </div>
        </div>;
    }
}

export default Indicators;
