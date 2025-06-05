import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const AdminLayout = ({ children }) => (
  <Layout>
    <Content>{children}</Content>
  </Layout>
);

export default AdminLayout;
