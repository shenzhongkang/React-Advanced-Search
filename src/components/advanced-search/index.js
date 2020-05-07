/**
 * Advanced Search
 */
import React, { useState, useRef } from 'react';
import PT from 'prop-types';
import { Input, Tag, Popover } from 'antd';
import { ClockCircleOutlined, SearchOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ElementsFactory from './items';
import upperFirst from 'lodash/upperFirst';
import styles from './styles.scss';

const colors = [
  'magenta',
  'red',
  'volcano',
  'gold',
  'orange',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
];

const AdvancedSearch = ({
  searchKeys = [],
  searchValues = {},
  onSearch
}) => {
  const inputRef = useRef(null);
  const [keys, setKeys] = useState(searchKeys);
  const [values] = useState(searchValues);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [kvDisplay, setKvDisplay] = useState({ keyDisplay: false, valueDisplay: false });
  const [list, setList] = useState([]);
  const [currentKey, setCurrentKey] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [type, setType] = useState(null);

  const [conditionVisible, setConditionVisible] = useState(false);

  const [historys, setHistorys] = useState([]);

  // handle clear
  const onClear = () => {
    list.forEach(it => {
      keys.push({ key: it.key, label: it.keyLabel })
    });
    setKeys(keys);
    setList([]);
    setCurrentKey('');
    setCurrentInput('');
    inputRef.current.focus();
  };

  // handle search key change.
  const onSearchKeyChange = condition => {
    const searchKeys = [...keys];
    const searchList = [...list];
    searchKeys.forEach((it, idx) => {
      if (it.key === condition) {
        searchKeys.splice(idx, 1);
        searchList.push({ keyLabel: it.label, key: it.key });
      }
    });
    setCurrentKey(condition);
    setKvDisplay({ keyDisplay: false, valueDisplay: true });
    setCurrentInput('');
    setKeys(searchKeys);
    setList(searchList);
    setType(upperFirst(`${values[condition].type}Item`));
  };

  // elements generation
  const createEl = () => {
    const Comp = ElementsFactory[type];
    let dataSource = [], placeholder = '', format, showTime, unCheckedChildren, checkedChildren;
    if (currentKey) { // to do some optimization...
      dataSource = values[currentKey].dataSource || [];
      placeholder = values[currentKey].placeholder;
      format = values[currentKey].format || 'YYYY-MM-DD';
      showTime = values[currentKey].showTime;
      checkedChildren = values[currentKey].checkedChildren;
      unCheckedChildren = values[currentKey].unCheckedChildren;
    }
    if (Comp) {
      return (
        <Comp
          onOk={onOk}
          dataSource={dataSource}
          placeholder={placeholder}
          format={format}
          showTime={showTime}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
        />
      );
    }
    return <ElementsFactory.InputItem onOk={onOk} />;
  };

  const onOk = (type, v) => {
    let value, label;
    switch (type) {
      case 'checkbox':
        value = v;
        label = v.join(',');
        break;
      case 'rangePicker':
        value = v;
        label = v.join(' ~ ');
        break;
      default:
        value = label = v;
        break;
    }

    const searchList = [...list];
    searchList.forEach(it => {
      if (it.key === currentKey) {
        it.value = value;
        it.valueLabel = label;
      }
    })

    setList(searchList);
    setKvDisplay({ keyDisplay: true, valueDisplay: false });
    inputRef.current.focus();
  };

  // handle submit
  const onSubmit = e => {
    setKvDisplay({ keyDisplay: false, valueDisplay: false });
    if (e.target.value) {
      return onSearch({ keyword: e.target.value });
    }
    const searchListBak = JSON.parse(JSON.stringify(list));
    historys.push(searchListBak);
    let data = {};
    searchListBak.forEach(it => {
      data[it.key] = it.value;
    });
    setHistorys(historys);
    onSearch(data);
  };

  // handle tag closed.
  const onCloseTag = (it, idx) => {
    list.splice(idx, 1);
    keys.splice(idx, 0, { label: it.keyLabel, key: it.key });
    setCurrentKey('');
    setList(list);
    setKeys(keys);
    inputRef.current.focus();
  }

  // handle submit from history.
  const onSubmitFromHistory = (his = [], initial) => {
    let data = {};
    const searchListBak = JSON.parse(JSON.stringify(list));
    const searchKeysBak = JSON.parse(JSON.stringify(keys));

    const searchListKeys = searchListBak.map(it => ({ key: it.key, label: it.label }));

    const searchCollections = [...searchKeysBak, ...searchListKeys];
    const serachDifferences = searchCollections.filter(it => !his.some(i => i.key === it.key));

    setList(his);
    setKeys(serachDifferences);
    setHistoryVisible(false);
    his.forEach(it => {
      data[it.key] = it.value;
    });
    if (!initial) {
      onSearch(data);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.component}>
        <Popover
          title={(
            <div className={styles.hisLegend}>Recent searches <CloseOutlined onClick={() => setHistoryVisible(false)} className={styles.hisClose} /></div>
          )}
          trigger='click'
          visible={historyVisible}
          onVisibleChange={v => setHistoryVisible(v)}
          getPopupContainer={node => node.parentNode}
          placement='bottomRight'
          content={(
            <div className={styles.history}>
              <ul className={styles.hisList}>
                {historys.map((his = [], index) => (
                  <li key={`his-${index}`} onClick={() => onSubmitFromHistory(his)}>
                    {his.length > 0 ? his.map((it, idx) => (
                      <span key={`hisItem-${idx}`}>{it.key}: <strong>{it.value}</strong>&nbsp;</span>
                    )) : <span>Nothing Here</span>}
                  </li>
                ))}
                {historys.length > 0 ?
                  <li className={styles.hisClear} onClick={() => setHistorys([])}>Clear recent searches</li> :
                  <p>You don't have any recent searches</p>
                }
              </ul>
            </div>
          )}
          destroyTooltipOnHide={true}
        >
          <ClockCircleOutlined />
        </Popover>
        <div className={styles.search}>
          <div className={styles.searchList}>
            {list.map((it, idx) => (
              <Tag key={`tag-${idx}`} closable={true} color={colors[idx > colors.length - 1 ? idx % colors.length : idx]} onClose={() => onCloseTag(it, idx)}>
                {it.keyLabel}: {it.valueLabel}
              </Tag>
            ))}
          </div>
          <Popover
            trigger='click'
            getPopupContainer={node => node.parentNode}
            placement='bottomLeft'
            visible={conditionVisible}
            content={(
              <>
                {kvDisplay.keyDisplay && (
                  <ul className={styles.condition}>
                    <li onClick={onSubmit}><SearchOutlined /> Press Enter Or Click Here</li>
                    {keys.map(it => <li key={it.key} onClick={() => onSearchKeyChange(it.key)}>{it.label}</li>)}
                  </ul>
                )}
                {kvDisplay.valueDisplay && (
                  <div className={styles.inputContainer}>
                    {createEl()}
                  </div>
                )}
              </>
            )}
            onVisibleChange={v => setConditionVisible(v)}
          >
            <Input ref={inputRef} onClick={() => setKvDisplay({ keyDisplay: true })} onPressEnter={onSubmit} className={styles.searchInput} placeholder='请选择...' />
          </Popover>
        </div>
        {list.length > 0 && <CloseCircleOutlined onClick={onClear} />}
      </div>
    </div>
  );
};

AdvancedSearch.defaultProps = {
  searchKeys: [
    {
      key: 'condition1',
      label: 'Condition One'
    },
    {
      key: 'condition2',
      label: 'Condition Two'
    }
  ],
  searchValues: {
    condition1: { type: 'radio', dataSource: ['1', '2', '3'] },
    condition2: { type: 'input' }
  },
  onSearch: data => console.log(data)
};

AdvancedSearch.propTypes = {
  searchKeys: PT.array.isRequired,
  searchValues: PT.object.isRequired,
  onSearch: PT.func,
  autoFocus: PT.bool
};

export default AdvancedSearch;
