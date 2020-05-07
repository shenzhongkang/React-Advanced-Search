import React from 'react';
import { ConfigProvider } from 'antd';
import { render } from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import View from './view';
import './index.scss';

render(<ConfigProvider locale={zhCN}><View /></ConfigProvider>, document.getElementById('app'));
