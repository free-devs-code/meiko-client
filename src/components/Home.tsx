import React from "react";
import Layout from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";
import '../styles/Home.css';

interface HomeProps {
    sidebarCollapsed: boolean;
}

const Home: React.FC<HomeProps> = ({ sidebarCollapsed }) => {
    return (
        <Layout className={`home-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Content className="home-content">
                <div className="text-overlay">
                    <h2 className="overlay-title">
                        Welcome to the ultimate resource Meiko Brand Guidelines
                    </h2>
                    <p className="overlay-text">
                        Here you will find our comprehensive brand guidelines, detailing the fundamental principles that define our brand, along with specific instructions on how to use our logos, color palettes, and typography. This hub also provides detailed rules for all of our communication media, including brochures, user interfaces, and social media. You don't need to register to access these guidelines. We encourage you to browse the sections to ensure your work accurately reflects our brand's consistent, trustworthy, and recognizable presence
                    </p>
                </div>
            </Content>
        </Layout>
    );
};

export default Home;