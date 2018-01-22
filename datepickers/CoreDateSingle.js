/* global components */
import React from "react";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";
import IconArrowLeft from "../svg/core/IconArrowLeft.svg";
import IconArrowRight from "../svg/core/IconArrowRight.svg";
import IconDate from "../svg/core/IconDate.svg";
import IconError from "../svg/core/IconError.svg";
import 'react-dates/initialize';
import DayPickerSingleDateController from "react-dates/esm/components/DayPickerSingleDateController";

import "react-dates/lib/css/_datepicker.css";
import './_coreColors.less';
import './_CoreDate.less';

import InputDate from "./CoreInputDate";

const propTypes = {
    isManualInputAllowed: PropTypes.bool,
    initialDate: PropTypes.instanceOf(Date),
    placeholder: PropTypes.string,
    hasCalendar: PropTypes.bool,
    hasClearButton: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    isRTL: PropTypes.bool,
    locale: PropTypes.oneOf(["de", "fr", "it", "en-gb"]),
    isDayBlocked: PropTypes.func,
    isOutsideRange: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string
};

const defaultProps = {
    isManualInputAllowed: true,
    initialDate: null,
    placeholder: "Choose a date",
    hasCalendar: true,
    hasClearButton: true,
    disabled: false,
    readOnly: false,
    isRTL: false,
    locale: "en-gb",
    isDayBlocked: () => {},
    isOutsideRange: () => {},
    onChange: () => {}
};

class CoreDateSingle extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            date: this.props.initialDate || new Date(),
            focused: false,
            dateHasChanged: false
        };
    }

    onDayBlocked = (date) => {
        let dateIn = moment.isMoment(date) ? moment(date).toDate() : date;
        return this.props.isDayBlocked(dateIn);
    }

    onOutsideRange = (date) => {
        let dateIn = moment.isMoment(date) ? moment(date).toDate() : date;
        return this.props.isOutsideRange(dateIn);
    }

    handleDateChange = (date) => {
        let dateIn = moment.isMoment(date) ? moment(date).toDate() : date;
        if (dateIn !== this.state.date) {
            this.setState({
                date: dateIn,
                dateHasChanged: true
            });
            this.props.onChange(dateIn);
        }
        this.handleCloseCalendar();
    }

    handleFocusCalendar = () => {
        this.setState({ focused: !this.state.focused});
    }

    handleOpenCalendar = () => {
        this.setState({ focused: true});
    }

    handleCloseCalendar = () => {
        this.setState({ focused: false});
    }

    handleClear = () => {
        this.setState({
            date: null,
            dateHasChanged: true
        });
        this.props.onChange(null);
    }

    handleKeyDown = (ev) => {
        if (ev.key === "Escape") {
            this.handleCloseCalendar();
        }
    }

    render() {
        const {
            isManualInputAllowed,
            initialDate,
            placeholder,
            hasCalendar,
            hasClearButton,
            disabled,
            readOnly,
            isRTL,
            locale,
            className
        } = this.props;

        const {
            focused,
            date,
            dateHasChanged
        } = this.state;

        const shouldDisplayClear = (hasClearButton && dateHasChanged && date !== null && !readOnly) || (hasClearButton && initialDate !== null && !dateHasChanged && !readOnly);

        let pickerDate = date ? moment(date).locale(locale) : moment(new Date()).locale(locale);

        let classList = classNames("Date", "Date--single", className, {
            "is-disabled" : disabled,
            "has-placeholder" : !isManualInputAllowed && initialDate === null,
            "has-icon" : hasCalendar,
            "has-clear" : hasClearButton
        });

        let clearButtonAttributes = {};
        clearButtonAttributes.className = "Date__button";
        clearButtonAttributes.disabled = disabled;
        clearButtonAttributes.readOnly = readOnly;
        clearButtonAttributes.type = "reset";
        if (!readOnly) {
            clearButtonAttributes.onClick = this.handleClear;
        }

        let calendarButtonAttributes = {};
        calendarButtonAttributes.className = "Date__button";
        calendarButtonAttributes.disabled = disabled;
        calendarButtonAttributes.readOnly = readOnly;
        calendarButtonAttributes.type = "button";
        if (!readOnly) {
            calendarButtonAttributes.onClick = this.handleFocusCalendar;
        }

        let dateInputAttributes = {};
        dateInputAttributes.className = "Date__input";
        if (!isManualInputAllowed) {
            dateInputAttributes.onClick = this.handleOpenCalendar;
        }

        return (
            <div className={classList} onKeyDown={this.handleKeyDown}>
        <span {...dateInputAttributes}>
          <InputDate
              initialDate={initialDate}
              date={date}
              disabled={disabled}
              readOnly={readOnly}
              isManualInputAllowed={isManualInputAllowed}
              placeholder={placeholder}
              onDateChange={this.handleDateChange}
              onPlaceholderClick={this.handleOpenCalendar}
          />
        </span>
                {
                    shouldDisplayClear ?
                        <span className="Date__clear">
              <button {...clearButtonAttributes}>
                <IconError />
              </button>
            </span>
                        : null
                }
                {
                    hasCalendar ?
                        <span className="Date__action">
              <button {...calendarButtonAttributes}>
                <IconDate />
              </button>
            </span>
                        : null
                }
                {
                    focused ?
                        <div className="Date__picker">
                            <DayPickerSingleDateController
                                onDateChange={this.handleDateChange}
                                onFocusChange={this.handleFocusChange}
                                focused={focused}
                                date={pickerDate}
                                numberOfMonths={1}
                                navPrev={isRTL ? <IconArrowRight /> : <IconArrowLeft />}
                                navNext={isRTL ? <IconArrowLeft /> : <IconArrowRight />}
                                hideKeyboardShortcutsPanel
                                onOutsideClick={this.handleCloseCalendar}
                                daySize={32}
                                isRTL={isRTL}
                                isDayBlocked={this.onDayBlocked}
                                isOutsideRange={this.onOutsideRange}
                            />
                        </div>
                        : null
                }
            </div>
        );
    }
}

CoreDateSingle.propTypes = propTypes;
CoreDateSingle.defaultProps = defaultProps;

export default CoreDateSingle;
