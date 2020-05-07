/**
 * Search Item - Tree
 */
import React from 'react';
import { Tree } from 'antd';

const TreeItem = ({
  onOk,
  dataSource = []
}) => {

  const onSelect = (e, opt) => {
    const { key } = opt.node;
    onOk('tree', key);
  };

  return (
    <Tree
      treeData={dataSource}
      onSelect={onSelect}
    />
  );
};

export default TreeItem;
