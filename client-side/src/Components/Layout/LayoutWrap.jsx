import { Layout, Menu} from 'antd';
import {HomeOutlined,EditOutlined} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Pages/style.css'
const { Header, Content, Footer, Sider } = Layout;


const LayoutWrap = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
      >
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<EditOutlined />}>
            <Link to='/contact'>Insert Task</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content  style={{ margin: '0 16px' }}>

          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
        {children}

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Group 9 ©2022 By Kimbo and Barbie</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutWrap;
