import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import './_CoreInputDate.less';

const propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  isManualInputAllowed: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onDateChange: PropTypes.func,
  onPlaceholderClick: PropTypes.func
};

const defaultProps = {
  date: new Date(),
  isManualInputAllowed: true,
  disabled: false,
  readOnly: false,
  placeholder: "Choose a date",
  onDateChange() {},
  onPlaceholderClick() {}
};

const isPlaceholderCompatible = "placeholder" in document.createElement("input") ? true : false;

const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

class CoreInputDate extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDayComplete: false,
      isMonthComplete: false,
      isYearComplete: false,
      isPlaceholderCompatible: isPlaceholderCompatible,
      day: this.props.initialDate ? this.props.date.getDate() : null,
      month: this.props.initialDate ? this.props.date.getMonth() : null,
      year: this.props.initialDate ? this.props.date.getFullYear() : null
    };
  }


  componentDidMount() {
    if (this.props.initialDate) {
      this.inputDay.value = this.state.day === null ? "" : ("0" + this.state.day).slice(-2);
      this.inputMonth.value = this.state.month === null ? "" : ("0" + (this.state.month + 1)).slice(-2);
      this.inputYear.value = this.state.year === null ? "" : this.state.year;
    } else {
      this.inputDay.value = this.state.isPlaceholderCompatible ? "" : "DD";
      this.inputMonth.value = this.state.isPlaceholderCompatible ? "" : "MM";
      this.inputYear.value = this.state.isPlaceholderCompatible ? "" : "YYYY";
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.day !== prevState.day || this.state.month !== prevState.month || this.state.year !== prevState.year) {
      if (this.isValidDay() && this.isValidMonth() && this.isValidYear()) {
        this.props.onDateChange(new Date(
          this.state.year,
          this.state.month,
          this.state.day
        ));
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const isNewDate = nextProps.date && this.props.date !== nextProps.date;
    if (isNewDate) {
      this.setState({
        day: nextProps.date.getDate(),
        month: nextProps.date.getMonth(),
        year: nextProps.date.getFullYear()
      });
      this.inputDay.value = ("0" + nextProps.date.getDate()).slice(-2);
      this.inputMonth.value = ("0" + (nextProps.date.getMonth() + 1)).slice(-2);
      this.inputYear.value = nextProps.date.getFullYear();
    } else if (nextProps.date === null) {
      this.setState({
        day: null,
        month: null,
        year: null
      });
      this.inputDay.value = this.state.isPlaceholderCompatible ? "" : "DD";
      this.inputMonth.value = this.state.isPlaceholderCompatible ? "" : "MM";
      this.inputYear.value = this.state.isPlaceholderCompatible ? "" : "YYYY";
    }
  }

  isValidDay() {
    let day = this.state.day;
    if (day >= 1 && day <= 31) {
      return true;
    }
    return false;
  }

  isValidMonth() {
    let month = this.state.month;
    if (month >= 0 && month <= 11) {
      return true;
    }
    return false;
  }
  isValidYear() {
    let year = this.state.year;
    if (this.state.year && year.toString().length === 4 && year >= 1000 && year <= 2500) {
      return true;
    }
    return false;
  }

  isNumericKey(ev) {
    return keys.indexOf(ev.key) === -1 ? false : true;
  }

  isSlashKey(ev) {
    return ev.key === "/" ? true : false;
  }

  handleSelectValue(ev) {
    let target = ev.currentTarget || ev.target;
    target.select();
  }

  handleFillValue(ev) {
    let currentValue = ev.currentTarget.value === "0" ? "1" : ev.currentTarget.value;
    let newValue = currentValue.length === 1 ? "0" + currentValue : currentValue;
    ev.currentTarget.value = newValue;
  }

  handleDayKeypressEvent = (ev) => {
    this.setState({
      isDayComplete: this.keyPressEvent(ev, {
        oneCharCondition: parseInt(ev.key, 10) > 3 && parseInt(ev.key, 10) < 10,
        specificValue: "3",
        specificValueSecondCharCondition: parseInt(ev.key, 10) === 1 || parseInt(ev.key, 10) === 0
      })
    });
  }

  handleDayKeyupEvent = () => {
    if (this.state.isDayComplete) {
      this.inputMonth.focus();
      this.setState({
        isDayComplete: false,
        day: parseInt(this.inputDay.value, 10)
      });
    }
  }

  handleMonthKeypressEvent = (ev) => {
    this.setState({
      isMonthComplete: this.keyPressEvent(ev, {
        oneCharCondition: parseInt(ev.key, 10) > 1 && parseInt(ev.key, 10) < 10,
        specificValue: "1",
        specificValueSecondCharCondition: parseInt(ev.key, 10) === 2 || parseInt(ev.key, 10) === 1 || parseInt(ev.key, 10) === 0
      })
    });
  }

  handleMonthKeyupEvent = () => {
    if (this.state.isMonthComplete) {
      this.inputYear.focus();
      this.setState({
        isMonthComplete: false,
        month: parseInt(this.inputMonth.value - 1, 10)
      });
    }
  }

  keyPressEvent = (ev, options) => {
    let target = ev.currentTarget || ev.target;
    let value = target.value;
    const {
      oneCharCondition,
      specificValue,
      specificValueSecondCharCondition
    } = options;

    const isOneCharCondition = oneCharCondition;
    const isSecondChar = value.length === 1;

    if (!this.isNumericKey(ev)) {
      if (this.isSlashKey && isSecondChar) {
        ev.preventDefault();
        return true;
      }
      ev.preventDefault();
      return false;
    } else if (!isSecondChar && isOneCharCondition) {
      return true;
    } else if (isSecondChar && value !== specificValue) {
      if (parseInt(ev.key, 10) === 0 && value === "0") {
        target.value = "01";
      }
      return true;
    } else if (isSecondChar && value === specificValue) {
      if (specificValueSecondCharCondition) {
        return true;
      } else {
        ev.preventDefault();
        return false;
      }
    }
    return false;
  }

  handleYearKeypressEvent = (ev) => {
    if (!this.isNumericKey(ev)) {
      ev.preventDefault();
      return;
    }
  }

  handleYearKeyupEvent = (ev) => {
    let target = ev.currentTarget || ev.target;
    if (target.value.length === 4) {
      this.setState({
        isYearComplete:true,
        year: parseInt(target.value, 10)
      });
    } else {
      this.setState({isYearComplete:false});
    }
  }

  render() {
    const {
      isManualInputAllowed,
      disabled,
      readOnly,
      initialDate,
      className,
      placeholder,
      onPlaceholderClick
    } = this.props;

    let inputDateclassList = classNames("InputDate", className, {
      "is-disabled" : disabled
      // "is-notPlaceholderCompatible": !this.state.isPlaceholderCompatible
    });

    let placeholderClassList = classNames("InputDate__placeholder", {
      "is-empty" : this.isValidDay() && this.isValidMonth() && this.isValidYear()
    });

    let placeholderContentClassList = classNames("InputDate__placeholder__content", {
      "is-hidden" : this.isValidDay() && this.isValidMonth() && this.isValidYear()
    });

    let inputDateAttributes = {};
    inputDateAttributes.className = inputDateclassList;
    if (!initialDate && !isManualInputAllowed) {
      inputDateAttributes.onClick = onPlaceholderClick;
      inputDateAttributes.onKeyPress = onPlaceholderClick;
    }

    let commonInputAttributes = {};
    commonInputAttributes.readOnly = !isManualInputAllowed;
    commonInputAttributes.disabled = disabled;
    commonInputAttributes.readOnly = readOnly;
    commonInputAttributes.onFocus = this.handleSelectValue;
    if (!isManualInputAllowed) {
      commonInputAttributes.tabIndex = -1;
      commonInputAttributes.readOnly = true;
    }

    let dayInputAttributes = {};
    if (isManualInputAllowed) {
      dayInputAttributes.onKeyPress = this.handleDayKeypressEvent;
      dayInputAttributes.onKeyUp = this.handleDayKeyupEvent;
      dayInputAttributes.onBlur = this.handleFillValue;
    }

    let monthInputAttributes = {};
    if (isManualInputAllowed) {
      monthInputAttributes.onKeyPress = this.handleMonthKeypressEvent;
      monthInputAttributes.onKeyUp = this.handleMonthKeyupEvent;
      monthInputAttributes.onBlur = this.handleFillValue;
    }

    let yearInputAttributes = {};
    if (isManualInputAllowed) {
      yearInputAttributes.onKeyPress = this.handleYearKeypressEvent;
      yearInputAttributes.onKeyUp = this.handleYearKeyupEvent;
    }

    return <div {...inputDateAttributes} >
      {
        !initialDate && !isManualInputAllowed ?
          <div className={placeholderClassList}>
            <button className="Date__button" onClick={onPlaceholderClick} ref={(button) => {
              this.buttonPlaceholder = button;
            }}>
              <span className={placeholderContentClassList}>
                {placeholder}
              </span>
            </button>
          </div>
        : null
      }
      <input className="InputDate__input InputDate__input--day"
        name="day" type="text" placeholder="DD" maxLength="2" key="inputDay" ref={(input) => {
          this.inputDay = input;
        }}
        {...commonInputAttributes} {...dayInputAttributes} />
      <span className="InputDate__separator" key="inputSeparator1">/</span>
      <input className="InputDate__input InputDate__input--month"
        name="month" type="text" placeholder="MM" maxLength="2" key="inputMonth" ref={(input) => {
          this.inputMonth = input;
        }} {...commonInputAttributes} {...monthInputAttributes} />
      <span className="InputDate__separator" key="inputSeparator2">/</span>
      <input className="InputDate__input InputDate__input--year"
        name="year" type="text" placeholder="YYYY" maxLength="4" key="inputYear" ref={(input) => {
          this.inputYear = input;
        }}
        {...commonInputAttributes} {...yearInputAttributes} />
    </div>;
  }
}

CoreInputDate.propTypes = propTypes;
CoreInputDate.defaultProps = defaultProps;

export default CoreInputDate;
