/**
 * Search Item - RangePicker
 */
import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const RangerpickerItem = ({
  onOk,
  placeholder = ['Start Date', 'End Date'],
  format = 'YYYY-MM-DD',
  showTime = false
}) => {

  // handle range picker change.
  const onChange = e => {
    const t0 = e[0].format(showTime ? 'YYYY-MM-DD HH:mm:ss' : format);
    const t1 = e[1].format(showTime ? 'YYYY-MM-DD HH:mm:ss' : format);
    onOk('rangePicker', [t0, t1]);
  };

  return (
    <RangePicker
      showTime={showTime}
      format={format}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default RangerpickerItem;
