import React from "react";
import Layout from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";
import '../styles/Home.css';
import { Row, Col } from 'antd';

interface HomeProps {
    sidebarCollapsed: boolean;
}

const contentStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '0px 25px 0px 50px',
    borderRadius: '10px 0 0 10px',
    maxWidth: '800px',
    maxHeight: '100%',
    height: '85vh',
    width: '100vw',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
};

const Home: React.FC<HomeProps> = ({ sidebarCollapsed }) => {
    return (
        <Layout className={`home-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Content className="home-content">
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}></Col>
                    <Col span={8} style={contentStyle}>
                        <h2 className="overlay-title">
                            Welcome to the ultimate resource Meiko Brand Guidelines
                        </h2>
                        <p className="overlay-text">
                            Here you will find our comprehensive brand guidelines, detailing the fundamental principles that define our brand, along with specific instructions on how to use our logos, color palettes, and typography. This hub also provides detailed rules for all of our communication media, including brochures, user interfaces, and social media. You don't need to register to access these guidelines. We encourage you to browse the sections to ensure your work accurately reflects our brand's consistent, trustworthy, and recognizable presence
                        </p>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Home;