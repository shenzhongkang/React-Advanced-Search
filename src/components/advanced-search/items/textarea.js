/**
 * Search Item - TextArea
 */
import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const TextareaItem = ({
  onOk,
  placeholder
}) => {
  const onPressEnter = e => {
    onOk('textarea', e.target.value);
  }
  return (
    <TextArea autoSize={{ minRows: 4, maxRows: 8 }} onPressEnter={onPressEnter} autoFocus={true} placeholder={placeholder} />
  );
};

export default TextareaItem;
