/* eslint-disable no-console */
import React from "react";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";
import DayPickerRangeController from "react-dates/esm/components/DayPickerRangeController";
import IconArrowLeft from "../svg/core/IconArrowLeft.svg";
import IconArrowRight from "../svg/core/IconArrowRight.svg";
import IconDate from "../svg/core/IconDate.svg";
import IconError from "../svg/core/IconError.svg";
import IconArrowforward from "../svg/core/IconArrowforward.svg";
import IconArrowback from "../svg/core/IconArrowback.svg";

import "react-dates/lib/css/_datepicker.css";
import './_coreColors.less';
import './_CoreDate.less';

import InputDate from "./CoreInputDate";

const propTypes = {
  isManualInputAllowed: PropTypes.bool,
  initialStartDate: PropTypes.instanceOf(Date),
  initialEndDate: PropTypes.instanceOf(Date),
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  hasCalendar: PropTypes.bool,
  hasClearButton: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isRTL: PropTypes.bool,
  minimumNights: PropTypes.number,
  locale: PropTypes.oneOf(["de", "fr", "it", "en-gb"]),
  focusedInput: PropTypes.oneOf(["startDate", "endDate"]),
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string
};

const defaultProps = {
  isManualInputAllowed: true,
  initialStartDate: null,
  initialEndDate: null,
  startDatePlaceholder: "Choose start date",
  endDatePlaceholder: "Choose end date",
  hasCalendar: true,
  hasClearButton: true,
  disabled: false,
  readOnly: false,
  isRTL: false,
  minimumNights: 0,
  locale: "en-gb",
  isDayBlocked: () => {},
  isOutsideRange: () => {},
  onChange: () => {}
};

class CoreDateRange extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      focused: false,
      focusedInput: "startDate",
      startDate: this.props.initialStartDate || null,
      endDate: this.props.initialEndDate || null,
      startDateHasChanged: false,
      endDateHasChanged: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
      this.props.onChange(this.state.startDate, this.state.endDate);
    }
  }

  handleFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: focusedInput ? focusedInput : "endDate",
      startInputClassName: focusedInput === "startDate" && "is-active",
      endInputClassName: focusedInput === "endDate" && "is-active"
    });
  }

  onDayBlocked = (date) => {
    let dateIn = moment.isMoment(date) ? moment(date).toDate() : date;
    return this.props.isDayBlocked(dateIn);
  }

  onOutsideRange = (date) => {
    let dateIn = moment.isMoment(date) ? moment(date).toDate() : date;
    return this.props.isOutsideRange(dateIn);
  }

  handleDatesChange = ({ startDate, endDate }) => {
    let startDateIn = moment.isMoment(startDate) ? moment(startDate).toDate() : startDate;
    let endDateIn = moment.isMoment(endDate) ? moment(endDate).toDate() : endDate;
    if (startDateIn !== this.state.startDate || endDateIn !== this.state.endDate) {
      this.setState({
        startDate: startDateIn,
        endDate: endDateIn,
        startDateHasChanged: true,
        endDateHasChanged: true
      });
      this.props.onChange(startDateIn, endDateIn);
    }
  }

  handleStartDateChange = (startDate) => {
    let startDateIn = moment.isMoment(startDate) ? moment(startDate).toDate() : startDate;
    if (startDateIn !== this.state.startDate ) {
      if (this.state.endDate !== null && startDateIn >= this.state.endDate) {
        this.setState({
          startDate: this.state.endDate,
          startDateHasChanged: true,
          focusedInput: "endDate"
        });
      } else {
        this.setState({
          startDate: startDateIn,
          startDateHasChanged: true,
          focusedInput: "endDate"
        });
      }
    }
    if (!this.state.endDateHasChanged) {
      this.inputEndDate.inputDay.focus();
    }
  }

  handleEndDateChange = (endDate) => {
    let endDateIn = moment.isMoment(endDate) ? moment(endDate).toDate() : endDate;
    if (endDateIn !== this.state.endDate ) {
      if (endDateIn >= this.state.startDate) {
        this.setState({
          endDate: endDateIn,
          endDateHasChanged: true
        });
        this.props.onChange(this.state.startDate, endDateIn);
      } else if (endDateIn <= this.state.startDate) {
        this.setState({
          endDate: this.state.startDate,
          endDateHasChanged: true
        });
        this.props.onChange(this.state.startDate, this.state.startDate);
      }
    }
    this.handleCloseCalendar();
  }

  handleClear = () => {
    this.setState({
      startDate: null,
      endDate: null,
      startDateHasChanged: true,
      endDateHasChanged: true
    });
    this.props.onChange(null);
  }

  handleKeyDown = (ev) => {
    if (ev.key === "Escape") {
      this.handleCloseCalendar();
    }
  }

  handleOpenCalendar = () => {
    this.setState({
      focused: true
    });
  }

  handleCalendarClick = () => {
    this.setState({
      focusedInput: "startDate",
      startInputClassName: "is-active",
      endInputClassName: ""
    });
    this.handleOpenCalendar();
  }

  handleCloseCalendar = () => {
    this.setState({
      focused: false,
      focusedInput: "startDate",
      startInputClassName: "",
      endInputClassName: ""
    });
  }

  handleClickStartDate = () => {
    this.setState({
      focusedInput: "startDate",
      startInputClassName: "is-active",
      endInputClassName: ""
    });
    this.handleOpenCalendar();
  }

  handleClickEndDate = () => {
    this.setState({
      focusedInput: "endDate",
      startInputClassName: "",
      endInputClassName: "is-active"
    });
    this.handleOpenCalendar();
  }

  render() {
    const {
      initialStartDate,
      initialEndDate,
      hasCalendar,
      hasClearButton,
      disabled,
      readOnly,
      isManualInputAllowed,
      startDatePlaceholder,
      endDatePlaceholder,
      className,
      locale,
      isRTL
    } = this.props;

    const {
      focused,
      focusedInput,
      startDate,
      endDate,
      startInputClassName,
      endInputClassName,
      startDateHasChanged,
      endDateHasChanged
    } = this.state;

    moment.locale(locale);
    let pickerStartDate = startDate ? moment(startDate).locale(locale) : null;
    let pickerEndDate = endDate ? moment(endDate).locale(locale) : null;

    const shouldDisplayClear =
      (hasClearButton && (startDateHasChanged && startDate !== null || endDateHasChanged && endDate !== null) && !readOnly)
      ||
      (hasClearButton && (!startDateHasChanged && initialStartDate !== null || !endDateHasChanged && initialEndDate !== null) && !readOnly);

    let classList = classNames("Date", "Date--range", className, {
      "is-disabled" : disabled,
      "has-placeholder" : !isManualInputAllowed && initialStartDate === null && initialEndDate === null,
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
      calendarButtonAttributes.onClick = this.handleCalendarClick;
    }

    let commonInputAttributes = {};
    commonInputAttributes.disabled = disabled;
    commonInputAttributes.readOnly = readOnly;
    commonInputAttributes.isManualInputAllowed = isManualInputAllowed;

    let startInputAttributes = {};
    startInputAttributes.className = startInputClassName;
    startInputAttributes.initialDate = initialStartDate;
    startInputAttributes.date = startDate;
    startInputAttributes.placeholder = startDatePlaceholder;
    startInputAttributes.onDateChange = this.handleStartDateChange;
    startInputAttributes.onPlaceholderClick = this.handleClickStartDate;
    if (!isManualInputAllowed) {
      startInputAttributes.onClick = this.handleClickStartDate;
    }

    let endInputAttributes = {};
    endInputAttributes.className = endInputClassName;
    endInputAttributes.initialDate = initialEndDate;
    endInputAttributes.date = endDate;
    endInputAttributes.placeholder = endDatePlaceholder;
    endInputAttributes.onDateChange = this.handleEndDateChange;
    endInputAttributes.onPlaceholderClick = this.handleClickEndDate;
    if (!isManualInputAllowed) {
      endInputAttributes.onClick = this.handleClickEndDate;
    }

    let startDateInputAttributes = {};
    if (!isManualInputAllowed) {
      startDateInputAttributes.onClick = this.handleClickStartDate;
    }

    let endDateInputAttributes = {};
    if (!isManualInputAllowed) {
      endDateInputAttributes.onClick = this.handleClickEndDate;
    }

    return (
      <div className={classList} onKeyDown={this.handleKeyDown}>
        <span className="Date__input" {...startDateInputAttributes}>
          <InputDate {...commonInputAttributes} {...startInputAttributes}
            ref={(el) => {
              this.inputStartDate = el;
            }}
          />
        </span>
        <span className="Date__arrow">
          {
            isRTL ?
              <IconArrowback />
            :
              <IconArrowforward />
          }
        </span>
        <span className="Date__input" {...endDateInputAttributes}>
          <InputDate {...commonInputAttributes} {...endInputAttributes}
            ref={(el) => {
              this.inputEndDate = el;
            }}
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
              <DayPickerRangeController
                startDate={pickerStartDate}
                endDate={pickerEndDate}
                focusedInput={focusedInput}
                onFocusChange={this.handleFocusChange}
                onDatesChange={this.handleDatesChange}
                numberOfMonths={2}
                disabled={false}
                isRTL={isRTL}
                minimumNights={0}
                startDatePlaceholderText={startDatePlaceholder}
                endDatePlaceholderText={endDatePlaceholder}
                navPrev={isRTL ? <IconArrowRight /> : <IconArrowLeft />}
                navNext={isRTL ? <IconArrowLeft /> : <IconArrowRight />}
                customCalendarIcon={<IconDate />}
                onOutsideClick={this.handleCloseCalendar}
                daySize={32}
                isDayBlocked={this.onDayBlocked}
                isOutsideRange={this.onOutsideRange}
                hideKeyboardShortcutsPanel
              />;
            </div>
          : null
        }
      </div>
    );
  }
}

CoreDateRange.propTypes = propTypes;
CoreDateRange.defaultProps = defaultProps;

export default CoreDateRange;
