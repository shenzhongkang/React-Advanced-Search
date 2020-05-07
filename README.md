### Advanced Search

![Demo](https://github.com/ShenZhongkang/React-Advanced-Search/blob/master/demo.png?raw=true)

#### Installation
> if published.
```bash
  $ npm i advanced-search
```

#### Local Develop
```bash
  $ npm i
  $ npm start
```
> Open `http://localhost:3030`.

#### How to use?
```js
/**
 * Local develop.
 */
import React from 'react';
import styles from './view.scss';
import AdvancedSearch from './app';

const View = () => {
  const onSearch = params => {
    console.log(params);
  }
  return (
    <div className={styles.container}>
      <AdvancedSearch
        searchKeys={[
          { key: 'input1', label: '输入1' },
          { key: 'input2', label: '输入2' },
          { key: 'radio1', label: '单选1' },
          { key: 'radio2', label: '单选2' },
          { key: 'radio3', label: '单选3' },
          { key: 'checkbox1', label: '多选1' },
          { key: 'checkbox2', label: '多选2' },
          { key: 'inputnumber1', label: '数字1' },
          { key: 'inputnumber2', label: '数字2' },
          { key: 'rangeDate', label: '时间段选择' },
          { key: 'date', label: '时间选择' },
          { key: 'tree', label: '树' },
          { key: 'description', label: '描述' },
          { key: 'is', label: '开关' }
        ]}
        searchValues={{
          input1: { type: 'input' },
          input2: { type: 'input', placeholder: 'Enter Your Name...' },
          radio1: { type: 'radio', dataSource: ['A', 'B', 'C'] },
          radio2: { type: 'radio', dataSource: ['A', 'B', 'C'] },
          radio3: { type: 'radio', dataSource: [{ label: 'Option One', value: 'A' }, { label: 'Option Two', value: 'B' }, { label: 'Option Three', value: 'C' }] },
          checkbox1: { type: 'checkbox', dataSource: ['A', 'B', 'C'] },
          checkbox2: { type: 'checkbox', dataSource: [{ label: 'Option One', value: 'A' }, { label: 'Option Two', value: 'B' }] },
          inputnumber1: { type: 'number' },
          inputnumber2: { type: 'number', placeholder: 'Enter or Select Number...' },
          rangeDate: { type: 'rangepicker' },
          date: { type: 'datepicker' },
          tree: {
            type: 'tree',
            dataSource: [
              {
                title: '0-0',
                key: '0-0',
                children: [
                  {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                      { title: '0-0-0-0', key: '0-0-0-0' },
                      { title: '0-0-0-1', key: '0-0-0-1' },
                      { title: '0-0-0-2', key: '0-0-0-2' },
                    ],
                  },
                  {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                      { title: '0-0-1-0', key: '0-0-1-0' },
                      { title: '0-0-1-1', key: '0-0-1-1' },
                      { title: '0-0-1-2', key: '0-0-1-2' },
                    ],
                  },
                  {
                    title: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                title: '0-1',
                key: '0-1',
                children: [
                  { title: '0-1-0-0', key: '0-1-0-0' },
                  { title: '0-1-0-1', key: '0-1-0-1' },
                  { title: '0-1-0-2', key: '0-1-0-2' },
                ],
              },
              {
                title: '0-2',
                key: '0-2',
              }
            ]
          },
          description: { type: 'textarea', placeholder: 'Enter something...' },
          is: { type: 'switch', unCheckedChildren: '关', checkedChildren: '开' }
        }}
        onSearch={onSearch}
      />
    </div>
  );
};

export default View;
```

#### Change logs
| Version | PublishDate | Changes | Remark |
|---------|-------------|---------|--------|
| `v 0.0.1` | 2020.05.04 | Initial | Enjoy it! |
