import React from 'react';
import { SyncOutlined } from '@ant-design/icons';

const Loading = () => (
  <div style={{ marginTop: 50, textAlign: 'center' }}>
    <SyncOutlined spin style={{ fontSize: '64px' }} />
  </div>
);

export default Loading;
