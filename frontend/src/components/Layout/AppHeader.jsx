import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import logoSite from '../../assets/images/logo_site.png';
import './AppHeader.less';

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const menuItems = [
    { key: '/', label: 'Trang chủ' },
    { key: '/about', label: 'Giới thiệu' },
    { key: '/services', label: 'Dịch vụ' },
    { key: '/projects', label: 'Dự án' },
    { key: '/news', label: 'Tin tức' },
    { key: '/jobs', label: 'Tuyển dụng' },
    { key: '/contact', label: 'Liên hệ' }
  ];

  return (
    <Header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logoSite} alt="Viễn thông ACT" />
        </Link>
        <Menu mode="horizontal" selectedKeys={[location.pathname]} className="desktop-menu">
          {menuItems.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.key}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
