import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const { Content } = Layout;

const AppLayout = () => (
  <Layout className="app-layout">
    <AppHeader />
    <Content className="app-content">
      <Outlet />
    </Content>
    <AppFooter />
  </Layout>
);

export default AppLayout;
