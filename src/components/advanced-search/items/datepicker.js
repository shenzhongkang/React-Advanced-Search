/**
 * Search Item - DatePicker
 */
import React from 'react';
import { DatePicker } from 'antd';

const DatepickerItem = ({
  onOk,
  placeholder = '请选择日期',
  showTime = false,
  format = 'YYYY-MM-DD'
}) => {

  const onChange = e => {
    onOk('datePicker', e.format(format))
  };

  return (
    <DatePicker
      showTime={showTime}
      placeholder={placeholder}
      onChange={onChange}
      format={format}
    />
  );
};

export default DatepickerItem;
