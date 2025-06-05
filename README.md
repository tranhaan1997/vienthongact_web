# Hướng dẫn xây dựng Website Viễn Thông ACT - React + Ant Design + PostgreSQL

## 🎯 PHÂN TÍCH CẤU TRÚC WEBSITE

Website vienthongact.vn có các chức năng chính:
- Trang chủ với giới thiệu công ty
- Giới thiệu chi tiết
- Danh mục dịch vụ
- Dự án đã thực hiện
- Tin tức & Sự kiện
- Tuyển dụng
- Liên hệ

## 📋 YÊU CẦU KỸ THUẬT CHI TIẾT

### 1. Frontend Technology Stack
```
- Framework: React.js
- UI Library: Ant Design (antd)
- State Management: Redux Toolkit hoặc Context API
- Routing: React Router v6
- HTTP Client: Axios
- Form Handling: Ant Design Form (built-in)
- Rich Text Display: html-react-parser
- Charts: Ant Design Charts
- Icons: @ant-design/icons
- SEO: React Helmet Async
```

### 2. Backend Technology Stack
```
- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- ORM: Sequelize
- Authentication: JWT + bcrypt
- File Upload: Multer + Cloudinary
- Email: Nodemailer
- Security: Helmet, CORS, express-rate-limit
- Admin Template Engine: EJS (optional)
```

## 🏗️ QUY TRÌNH PHÁT TRIỂN - FRONTEND FIRST

### PHASE 1: FRONTEND DEVELOPMENT với Ant Design (7-10 ngày)

#### Bước 1: Setup Project & Cài đặt Dependencies

```bash
# Khởi tạo React project
npx create-react-app vienthong-act
cd vienthong-act

# Cài đặt Ant Design và các dependencies
npm install antd @ant-design/icons
npm install react-router-dom axios
npm install react-helmet-async
npm install html-react-parser
npm install dayjs
npm install @ant-design/charts

# Optional: Cài đặt LESS để customize theme
npm install craco-less @craco/craco
```

**Cấu hình Ant Design (craco.config.js):**
```javascript
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#1890ff',
              '@link-color': '#1890ff',
              '@success-color': '#52c41a',
              '@warning-color': '#faad14',
              '@error-color': '#f5222d',
              '@font-size-base': '14px',
              '@heading-color': 'rgba(0, 0, 0, 0.85)',
              '@text-color': 'rgba(0, 0, 0, 0.65)',
              '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
              '@border-radius-base': '4px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

**Cấu trúc thư mục Frontend:**
```
frontend/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── banners/
│   │   ├── services/
│   │   └── news/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppHeader.jsx
│   │   │   ├── AppFooter.jsx
│   │   │   ├── AppLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── Home/
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ServicesGrid.jsx
│   │   │   └── LatestNews.jsx
│   │   ├── Common/
│   │   │   ├── Loading.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── NotFound.jsx
│   │   └── UI/
│   │       ├── ServiceCard.jsx
│   │       ├── NewsCard.jsx
│   │       ├── ProjectCard.jsx
│   │       └── ContactForm.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── ServiceDetailPage.jsx
│   │   ├── NewsPage.jsx
│   │   ├── NewsDetailPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── JobsPage.jsx
│   │   └── ContactPage.jsx
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── services/
│   │   ├── news/
│   │   └── ...
│   ├── data/              (Mock data - tạm thời)
│   │   ├── services.js
│   │   ├── news.js
│   │   ├── projects.js
│   │   └── jobs.js
│   ├── services/          (API services)
│   │   ├── api.js
│   │   ├── serviceAPI.js
│   │   ├── newsAPI.js
│   │   └── config.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── global.less
│   │   └── variables.less
│   ├── App.js
│   └── index.js
```

#### Bước 2: Tạo Layout với Ant Design

```javascript
// src/components/Layout/AppLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout className="app-layout">
      <AppHeader />
      <Content className="app-content">
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
```

```javascript
// src/components/Layout/AppHeader.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import './AppHeader.less';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();

  const menuItems = [
    { key: '/', label: 'Trang chủ' },
    { key: '/about', label: 'Giới thiệu' },
    { key: '/services', label: 'Dịch vụ' },
    { key: '/projects', label: 'Dự án' },
    { key: '/news', label: 'Tin tức' },
    { key: '/jobs', label: 'Tuyển dụng' },
    { key: '/contact', label: 'Liên hệ' },
  ];

  return (
    <Header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="Viễn thông ACT" />
        </Link>

        {screens.md ? (
          <Menu 
            mode="horizontal" 
            selectedKeys={[location.pathname]}
            className="desktop-menu"
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setVisible(true)}
              className="mobile-menu-btn"
            />
            <Drawer
              placement="right"
              onClose={() => setVisible(false)}
              visible={visible}
              width={280}
            >
              <Menu 
                mode="vertical" 
                selectedKeys={[location.pathname]}
                onClick={() => setVisible(false)}
              >
                {menuItems.map(item => (
                  <Menu.Item key={item.key}>
                    <Link to={item.key}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Drawer>
          </>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
```

#### Bước 3: Tạo các Components với Ant Design

```javascript
// src/components/UI/ServiceCard.jsx
import React from 'react';
import { Card, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ServiceCard = ({ service }) => {
  return (
    <Card
      hoverable
      cover={
        service.image && (
          <img alt={service.title} src={service.image} />
        )
      }
      actions={[
        <Link to={`/services/${service.slug}`}>
          Xem chi tiết <ArrowRightOutlined />
        </Link>
      ]}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div className="service-icon">
          <img src={service.icon} alt={service.title} />
        </div>
        <Title level={4}>{service.title}</Title>
        <Paragraph ellipsis={{ rows: 3 }}>
          {service.description}
        </Paragraph>
      </Space>
    </Card>
  );
};

export default ServiceCard;
```

```javascript
// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Empty, message } from 'antd';
import { motion } from 'framer-motion';
import ServiceCard from '../components/UI/ServiceCard';
import PageHeader from '../components/Common/PageHeader';
import { servicesData } from '../data/services'; // Mock data

const { Title } = Typography;

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(servicesData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <PageHeader 
        title="Dịch vụ của chúng tôi"
        breadcrumb={[
          { title: 'Trang chủ', path: '/' },
          { title: 'Dịch vụ' }
        ]}
      />
      
      <div className="container page-content">
        <Spin spinning={loading} size="large">
          {!loading && services.length === 0 ? (
            <Empty description="Không có dịch vụ nào" />
          ) : (
            <Row gutter={[24, 24]}>
              {services.map((service, index) => (
                <Col xs={24} sm={12} lg={8} key={service.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </Spin>
      </div>
    </>
  );
};

export default ServicesPage;
```

#### Bước 4: Contact Form với Ant Design Form

```javascript
// src/components/UI/ContactForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ sớm.');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[
              { required: true, message: 'Vui lòng nhập họ tên' },
              { min: 3, message: 'Họ tên phải có ít nhất 3 ký tự' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ tên" />
          </Form.Item>
        </Col>
        
        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="email@example.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="0901234567" />
          </Form.Item>
        </Col>
        
        <Col xs={24} md={12}>
          <Form.Item
            name="subject"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input prefix={<MessageOutlined />} placeholder="Tiêu đề tin nhắn" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="message"
        label="Nội dung"
        rules={[
          { required: true, message: 'Vui lòng nhập nội dung' },
          { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự' }
        ]}
      >
        <TextArea 
          rows={5} 
          placeholder="Nhập nội dung tin nhắn..."
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} size="large">
          Gửi tin nhắn
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
```

### PHASE 2: BACKEND với PostgreSQL (7-10 ngày)

#### Bước 5: Database Schema Design (PostgreSQL)

```sql
-- Database: vienthong_act

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'editor',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    icon VARCHAR(100),
    image VARCHAR(500),
    features JSONB,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News categories table
CREATE TABLE news_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News table
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    thumbnail VARCHAR(500),
    category_id INTEGER REFERENCES news_categories(id),
    tags JSONB,
    author_id INTEGER REFERENCES users(id),
    views INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    client VARCHAR(200),
    description TEXT,
    images JSONB,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'ongoing',
    technologies JSONB,
    order_index INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    department VARCHAR(100),
    location VARCHAR(200),
    type VARCHAR(50),
    requirements TEXT,
    description TEXT,
    benefits TEXT,
    salary_range VARCHAR(100),
    deadline DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_published ON news(is_published, published_at);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_jobs_active ON jobs(is_active);
```

#### Bước 6: Setup Backend với Sequelize

```bash
# Tạo backend directory
mkdir backend
cd backend
npm init -y

# Install dependencies
npm install express sequelize pg pg-hstore
npm install cors helmet compression morgan
npm install bcryptjs jsonwebtoken
npm install multer cloudinary
npm install express-validator
npm install dotenv
npm install --save-dev nodemon sequelize-cli
```

**Cấu trúc Backend:**
```
backend/
├── config/
│   ├── database.js
│   ├── cloudinary.js
│   └── config.json
├── controllers/
│   ├── authController.js
│   ├── serviceController.js
│   ├── newsController.js
│   ├── projectController.js
│   ├── jobController.js
│   └── contactController.js
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Service.js
│   ├── News.js
│   ├── NewsCategory.js
│   ├── Project.js
│   ├── Job.js
│   └── Contact.js
├── routes/
│   ├── auth.js
│   ├── services.js
│   ├── news.js
│   ├── projects.js
│   ├── jobs.js
│   └── contacts.js
├── middleware/
│   ├── auth.js
│   ├── upload.js
│   ├── validator.js
│   └── errorHandler.js
├── migrations/
├── seeders/
├── utils/
│   ├── generateToken.js
│   └── emailService.js
├── .env
├── .sequelizerc
├── app.js
└── server.js
```

#### Bước 7: Sequelize Models

```javascript
// backend/models/Service.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    slug: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    content: {
      type: DataTypes.TEXT
    },
    icon: {
      type: DataTypes.STRING(100)
    },
    image: {
      type: DataTypes.STRING(500)
    },
    features: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    orderIndex: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order_index'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: 'created_by',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'services',
    timestamps: true,
    underscored: true
  });

  Service.associate = (models) => {
    Service.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  };

  return Service;
};
```

```javascript
// backend/controllers/serviceController.js
const { Service, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllServices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Service.findAndCountAll({
      where: { isActive },
      order: [['orderIndex', 'ASC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'fullName', 'email']
      }]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const service = await Service.findOne({
      where: { slug, isActive: true },
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'fullName']
      }]
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const { title, description, content, icon, features } = req.body;
    const slug = req.body.slug || title.toLowerCase().replace(/\s+/g, '-');
    
    const service = await Service.create({
      title,
      slug,
      description,
      content,
      icon,
      image: req.file ? req.file.path : null,
      features,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

#### Bước 8: API Routes

```javascript
// backend/routes/services.js
const router = require('express').Router();
const serviceController = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateService } = require('../middleware/validator');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:slug', serviceController.getServiceBySlug);

// Protected routes
router.post('/', 
  authenticate, 
  authorize('admin'), 
  upload.single('image'),
  validateService,
  serviceController.createService
);

router.put('/:id', 
  authenticate, 
  authorize('admin'),
  upload.single('image'),
  validateService,
  serviceController.updateService
);

router.delete('/:id', 
  authenticate, 
  authorize('admin'),
  serviceController.deleteService
);

module.exports = router;
```

### PHASE 3: Admin Panel với Ant Design Pro (5-7 ngày)

#### Bước 9: Admin Dashboard

```javascript
// src/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Space } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  ProjectOutlined,
  TeamOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Column } from '@ant-design/charts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalNews: 0,
    totalProjects: 0,
    totalJobs: 0,
    totalContacts: 0,
    unreadContacts: 0
  });

  const [recentNews, setRecentNews] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Simulate API calls
    setStats({
      totalServices: 12,
      totalNews: 156,
      totalProjects: 24,
      totalJobs: 5,
      totalContacts: 89,
      unreadContacts: 12
    });

    setRecentNews([
      {
        key: '1',
        title: 'Ký kết hợp đồng với đối tác mới',
        views: 234,
        status: 'published',
        createdAt: '2024-01-15'
      },
      // More news...
    ]);

    setChartData([
      { month: 'T1', value: 38 },
      { month: 'T2', value: 52 },
      { month: 'T3', value: 61 },
      { month: 'T4', value: 45 },
      { month: 'T5', value: 48 },
      { month: 'T6', value: 38 },
    ]);
  };

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      month: { alias: 'Tháng' },
      value: { alias: 'Số bài viết' },
    },
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Dịch vụ"
              value={stats.totalServices}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tin tức"
              value={stats.totalNews}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Dự án"
              value={stats.totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Liên hệ chưa đọc"
              value={stats.unreadContacts}
              suffix={`/ ${stats.totalContacts}`}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Thống kê bài viết theo tháng">
            <Column {...config} />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Tin tức gần đây">
            <Table 
              dataSource={recentNews}
              pagination={false}
              size="small"
            >
              <Table.Column title="Tiêu đề" dataIndex="title" />
              <Table.Column 
                title="Lượt xem" 
                dataIndex="views" 
                render={views => (
                  <Space>
                    <EyeOutlined />
                    {views}
                  </Space>
                )}
              />
              <Table.Column 
                title="Trạng thái" 
                dataIndex="status"
                render={status => (
                  <Tag color={status === 'published' ? 'green' : 'gold'}>
                    {status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                  </Tag>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
```

## 📦 DEPLOYMENT

### Frontend Deployment (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy với Vercel
vercel --prod

# Hoặc Netlify
netlify deploy --prod
```

### Backend Deployment (Railway/Heroku)
```bash
# Railway
railway up

# Heroku
git push heroku main
```

### Database (PostgreSQL)
- Development: Local PostgreSQL
- Production: Railway PostgreSQL, Supabase, hoặc Amazon RDS

## 📊 TIMELINE CHI TIẾT

### Tuần 1-2: Frontend với Ant Design
- **Ngày 1-2**: Setup, routing, layout với Ant Design
- **Ngày 3-4**: Home page components
- **Ngày 5-6**: Services & News pages
- **Ngày 7-8**: Projects, Jobs, Contact pages
- **Ngày 9-10**: Responsive, animations, testing

### Tuần 3-4: Backend với PostgreSQL
- **Ngày 11-12**: Database design, Sequelize setup
- **Ngày 13-14**: Auth system, user management
- **Ngày 15-16**: Services & News APIs
- **Ngày 17-18**: Projects, Jobs, Contact APIs
- **Ngày 19-20**: File upload, testing

### Tuần 5: Admin Panel & Integration
- **Ngày 21-22**: Admin layout, dashboard
- **Ngày 23-24**: CRUD interfaces với Ant Design Pro
- **Ngày 25**: Deployment & final testing

## ✅ LỢI ÍCH CỦA TECH STACK NÀY

1. **Ant Design**: UI đẹp, components đầy đủ, form validation mạnh mẽ
2. **PostgreSQL**: ACID compliance, performance tốt, JSON support
3. **Sequelize**: Migration dễ dàng, type safety, relations rõ ràng
4. **Professional Look**: Ant Design cho giao diện chuyên nghiệp
5. **Scalability**: PostgreSQL xử lý data lớn tốt hơn MongoDB

## 🎯 TIPS KHI DÙNG ANT DESIGN

1. **Theme Customization**: Dùng Less variables để tùy chỉnh theme
2. **Form Handling**: Tận dụng Form.useForm() cho validation
3. **Table Features**: Sử dụng built-in sorting, filtering, pagination
4. **Responsive**: Dùng Grid system và useBreakpoint hook
5. **Icons**: @ant-design/icons có đầy đủ icons cần thiết

---

**Lưu ý:** Với Ant Design + PostgreSQL, bạn sẽ có một website chuyên nghiệp, dễ maintain và scale tốt cho tương lai.