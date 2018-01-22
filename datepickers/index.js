import React from 'react';
import CoreDateSingle from "./CoreDateSingle";
import CoreDateRange from "./CoreDateRange";

class Datepickers extends React.Component {

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

     isDayBlocked(dateIn) {
         var dateToBlock = new Date();
         return dateToBlock.getDate() === dateIn.getDate()
                && dateToBlock.getMonth() === dateIn.getMonth() && dateToBlock.getFullYear() === dateIn.getFullYear();
     }

    isOutsideRange(dateIn) {
        var startDate = new Date(2017, 10, 10, 0, 0, 0);
        var endDate   = new Date(2017, 10, 25, 23, 59, 59);
        /* New date to be sure to have same timezone */
        var dateToTest = new Date(dateIn.getFullYear(), dateIn.getMonth(), dateIn.getDate());
        return dateToTest.getTime() >= endDate.getTime() || dateToTest.getTime() <= startDate.getTime()
    }



    render() {
        return <div className="element_block_container">

            <div className="element_block core_margin">
                <CoreDateSingle onChange={() => {}} locale="fr"/>
                <CoreDateSingle onChange={() => {}} disabled />
                <div>Default with today blocked</div>
                <CoreDateSingle onChange={() => {}} isDayBlocked={this.isDayBlocked}/>
                <div>Default with date available only in range</div>
                <CoreDateSingle onChange={() => {}} isOutsideRange={this.isOutsideRange} initialDate={new Date(2017, 10, 15)}/>
                <div>Readonly with default date</div>
                <CoreDateSingle onChange={() => {}} readOnly initialDate={new Date(2017, 10, 15)}/>
                <div>Manual input only</div>
                <CoreDateSingle onChange={() => {}} hasCalendar={false} hasClearButton={false}/>
                <div>Manual input only with clear button and initial date</div>
                <CoreDateSingle onChange={() => {}} hasCalendar={false} initialDate={new Date(2017, 10, 15)}/>
                <div>Click only (manual input disabled) with custom placeholder</div>
                <CoreDateSingle onChange={() => {}} isManualInputAllowed={false} placeholder="Please choose a date"/>
                <div>Click only (manual input disabled) with initial date</div>
                <CoreDateSingle onChange={() => {}} isManualInputAllowed={false} initialDate={new Date(2017, 10, 15)}/>
                <div>RTL</div>
                <div dir="rtl">
                    <CoreDateSingle onChange={() => {}} isRTL />
                </div>
            </div>

            <div className="element_block core_margin">
                <CoreDateRange onChange={() => {}}/>
                <CoreDateRange onChange={() => {}} disabled/>
                <CoreDateRange onChange={() => {}} readOnly/>
                <div>Default with today blocked</div>
                <CoreDateRange onChange={() => {}} isDayBlocked={this.isDayBlocked}/>
                <div>Default with dates available only in a specific range</div>
                <CoreDateRange onChange={() => {}}
                               isManualInputAllowed={false}
                               initialStartDate={new Date(2017,9,25)}
                               initialEndDate={new Date(2017,9,31)}
                               isOutsideRange={this.isOutsideRange}/>
                <div>Click only (manual input disabled) with custom placehold</div>
                <CoreDateRange onChange={() => {}}
                               isManualInputAllowed={false}
                               startDatePlaceholder="Select start date"
                               endDatePlaceholder="Select end date"/>
                <div>Click only (manual input disabled) with initial dates</div>
                <CoreDateRange onChange={() => {}}
                               isManualInputAllowed={false}
                               initialStartDate={new Date(2017,9,25)}
                               initialEndDate={new Date(2017,9,31)}/>
                <div>Default with initial dates</div>
                <CoreDateRange onChange={() => {}}
                               initialStartDate={new Date(2017,9,25)}
                               initialEndDate={new Date(2017,9,31)}/>
            </div>

        </div>;
    }
}

export default Datepickers;
