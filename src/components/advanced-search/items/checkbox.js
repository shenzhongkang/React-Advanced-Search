/**
 * Search Item - Checkbox
 */
import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';

const checkStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

const CheckboxItem = ({
  onOk,
  dataSource = []
}) => {
  const [selected, setSelected] = useState([]);

  // handle checkbox change.
  const onChange = checked => {
    setSelected(checked);
  };

  // handle submit
  const onSubmit = () => {
    onOk('checkbox', selected);
  };

  return (
    <>
      <Checkbox.Group
        onChange={onChange}
      >
        {dataSource.map(it => {
          if (typeof it === 'object') {
            return <Checkbox style={checkStyle} key={JSON.stringify(it)} value={it.value}>{it.label}</Checkbox>
          }
          return <Checkbox style={checkStyle} value={it} key={it}>{it}</Checkbox>;
        })}
      </Checkbox.Group>
      <Button type='primary' onClick={onSubmit}>确认选择</Button>
    </>
  );
};

export default CheckboxItem;
