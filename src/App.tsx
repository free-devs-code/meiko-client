import { useState, useEffect } from 'react';
import { Layout } from 'antd'; // Import Layout from Ant Design
import AppHeader from './components/Header';
import Sidebar from './components/Sidebar';
import Services from './components/Services';
import Home from './components/Home';

import './App.css';

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle sidebar collapse state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Detect screen size for automatic sidebar collapse
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // Collapse on small screens
      } else {
        setCollapsed(false); // Expand on larger screens
      }
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', updateWidth);

    // Initial check on mount
    updateWidth();

    // Cleanup on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={toggleCollapsed} />
        <Layout style={{ paddingLeft: collapsed ? '30px' : '200px' }}>
          <Content style={{ padding: '24px', marginTop: '64px' }}>
            {/* Your page content goes here */}
            

            <Home sidebarCollapsed={false} />
            <Services />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
