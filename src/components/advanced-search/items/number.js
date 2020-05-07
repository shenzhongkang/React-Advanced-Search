/**
 * Search Item - Number
 */
import React, { useState } from 'react';
import { InputNumber, Button } from 'antd';

const NumberItem = ({
  onOk,
  placeholder = ''
}) => {
  const [number, setNumber] = useState();

  const onChange = v => {
    setNumber(parseFloat(v));
  };

  const onPressEnter = e => {
    onOk('number', parseFloat(e.target.value) || 0);
  };

  // handle submit
  const onSubmit = () => {
    onOk('number', number || 0);
  };

  return (
    <>
      <InputNumber autoFocus={true} onPressEnter={onPressEnter} style={{ width: '100%', marginBottom: 8 }} onChange={onChange} placeholder={placeholder} />
      <Button onClick={onSubmit} type='primary'>确认</Button>
    </>
  );
};

export default NumberItem;
