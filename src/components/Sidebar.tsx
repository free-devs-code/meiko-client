import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, FolderOpenOutlined } from "@ant-design/icons";

import '../styles/AppSider.css'


const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
    const [selectedKey, setSelectedKey] = useState('1'); // Default active item

  // Function to handle menu item click
  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={250} style={{ paddingTop: '90px', backgroundColor: '#0E151A', minHeight: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
            <Menu mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick} style={{ height: '100%', borderRight: 0, backgroundColor: '#0E151A', color: '#fff' }}>
                <Menu.Item key="1" icon={<HomeOutlined />} style={{ color: '#fff', fontSize: '18px'}}>
                    Home
                </Menu.Item>
                <Menu.Item key="2" icon={<FolderOpenOutlined />} style={{ color: '#fff', fontSize: '18px' }}>
                    Browse
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;