import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class ButtonDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      startDate: moment().subtract(15, 'years'),
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
    this.props.onDateChange(date);
    this.toggleCalendar();
  };

  toggleCalendar = (e) => {
    this.setState({ isOpen: !this.state.isOpen });
    e && e.preventDefault();
  };

  formatDate = (date) => {
    const format = 'DD/MM/YYYY';
    return date ? moment(date, format) : this.state.startDate;
  };

  render() {
    return (
      <div>
        <button className="btn btn-info btn-block" onClick={this.toggleCalendar}>
          {this.props.dateValue ? this.props.dateValue : this.props.placeholderText}
        </button>
        {this.state.isOpen && (
          <DatePicker
            name={this.props.name}
            id={this.props.name}
            locale="pt-br"
            dateFormat="DD/MM/YYYY"
            selected={this.formatDate(this.props.dateValue)}
            onChange={this.handleChange}
            withPortal
            inline
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={this.props.placeholderText}
          />
        )}
      </div>
    );
  }

  componentWillReceiveProps({ stop }) {
    if (stop) {
      this.stop();
    }
  }
}

ButtonDatePicker.propTypes = {
  placeholderText: PropTypes.string,
  onDateChange: PropTypes.func,
  dateValue: PropTypes.string,
  name: PropTypes.string,
};

export default ButtonDatePicker;
