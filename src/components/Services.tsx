import React, { useState } from "react";
import { Row, Col, Card, Typography, ConfigProvider, Input, Button } from 'antd';
import { FolderOpenOutlined, DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { servicesData } from "../data/serviceData";
import type { ServiceData } from "../types/serviceTypes";

import '../App.css'

const { Paragraph } = Typography;
const { Meta } = Card;
const { Search } = Input;


const Services: React.FC = () => {
    const [search, setSearch] = useState<string | "">("");

    const filteredData: ServiceData[] = servicesData.filter(
        (item: { title: string; description: string; }) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
    );


    return (

        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        actionsBg: '#0083bb', // your custom background color
                    },

                    Button: {
                        colorPrimary: '#0083bb', // changes background for primary buttons
                        colorText: '#ffffff',    // optional: changes text color
                    },

                },
            }}
        >
            <div id="browse-section" style={{ marginBottom: 100 }}>
                <Row gutter={24} justify="end" style={{ marginBottom: 30, marginTop: 100, padding: "50px", marginRight: "30px" }}>
                    <Search
                        placeholder="Search products"
                        allowClear
                        enterButton={<Button type="primary" style={{ lineHeight: "37px", borderRadius: "0 6px 6px 0" }} icon={<SearchOutlined />} size="large" />}
                        onChange={(e) => setSearch(e.target.value)}
                        size="large"
                        style={{
                            width: 600,
                            fontSize: "25px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                </Row>

                <Row gutter={[16, 16]} justify="start" style={{ padding: '0 20px', marginTop: '30px' }}>
                    {filteredData.map((item, index) => (
                        <Col
                            key={index}
                            xs={24}   // full width on extra small screens
                            sm={12}   // 2 cards per row on small screens
                            md={8}    // 3 cards per row on medium screens
                            lg={8}    // 3 cards per row on large screens
                            xl={8}
                        >
                            <Link
                                to={`components/Services/${item.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Card
                                    hoverable
                                    style={{
                                        width: "80%",
                                        backgroundColor: "#0083bb",
                                        color: "#FFF",
                                        transition: "all 0.3s ease", // smooth effect
                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={item.image}
                                            style={{ objectFit: "cover" }}
                                        />
                                    }
                                    bodyStyle={{ padding: "16px" }}
                                >
                                    <div
                                        style={{
                                            textAlign: "left",
                                            fontSize: "1rem",
                                            letterSpacing: "0.7px",
                                            color: "#FFF",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <Paragraph
                                        style={{
                                            textAlign: "left",
                                            color: "#FFF",
                                            letterSpacing: "0.7px",
                                            marginTop: "8px",
                                        }}
                                        ellipsis={{ rows: 2, expandable: false }}
                                    >
                                        {item.description}
                                    </Paragraph>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>

        </ConfigProvider>
    );
};

export default Services;