/**
 * Search Item - Radio
 */
import React from 'react';
import { Radio } from 'antd';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

const RadioItem = ({
  onOk,
  dataSource = []
}) => {

  // handle radio changed.
  const onChange = e => {
    onOk('radio', e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
    >
      {dataSource.map(it => {
        if (typeof it === 'object') {
          return <Radio style={radioStyle} key={JSON.stringify(it)} value={it.value}>{it.label}</Radio>;
        }
        return <Radio style={radioStyle} value={it} key={it}>{it}</Radio>;
      })}
    </Radio.Group>
  );
};

export default RadioItem;
