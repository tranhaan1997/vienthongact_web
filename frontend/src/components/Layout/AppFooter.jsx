import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    © {new Date().getFullYear()} Viễn Thông ACT
  </Footer>
);

export default AppFooter;
