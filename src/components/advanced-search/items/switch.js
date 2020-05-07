/**
 * Search Item - Switch
 */
import React from 'react';
import { Switch } from 'antd';

const SwitchItem = ({
  onOk,
  checkedChildren,
  unCheckedChildren
}) => {

  const onChange = checked => {
    onOk('switch', String(checked));
  };

  return (
    <div>
      <Switch
        onChange={onChange}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    </div>
  );
};

export default SwitchItem;
