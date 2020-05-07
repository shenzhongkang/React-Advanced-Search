/**
 * Search Item - Input
 */
import React from 'react';
import { Input } from 'antd';

const InputItem = ({
  onOk,
  placeholder = ''
}) => {
  const onPressEnter = e => {
    onOk('input', e.target.value);
  }
  return (
    <Input onPressEnter={onPressEnter} autoFocus={true} placeholder={placeholder} />
  );
};

export default InputItem;