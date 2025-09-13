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
            <div style={{ marginBottom: 100}}>
                <Row gutter={24} justify="end" style={{ marginBottom: 30, marginTop: 100, padding: "50px", marginRight: "30px" }}>
                    <Search
                        placeholder="Search products"
                        allowClear
                        enterButton={<Button type="primary" style={{lineHeight: "37px", borderRadius: "0 6px 6px 0"}} icon={<SearchOutlined />} size="large"/>}
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
                            <Card 

                                style={{ width: '80%', backgroundColor: '#0083bb', boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"  }}
                                cover={
                                    <img
                                        alt="example"
                                        src={item.image}
                                    />
                                }

                                actions={[
                                    <Link to={`components/Services/${item.id}`}>
                                        <FolderOpenOutlined
                                         key="setting" style={{ color: '#FFF', fontSize: '18px' }} />
                                    </Link>,
                                    <DownloadOutlined key="edit" style={{ color: '#FFF', fontSize: '18px' }} />,
                                ]}
                            >
                                <Meta
                                    title={<div style={{ textAlign: 'left', fontSize: '1rem', letterSpacing: '0.7px', color: '#FFF' }}>{item.title}</div>}
                                    description={
                                        <Paragraph style={{ textAlign: 'left', color: '#FFF', letterSpacing: '0.7px' }} ellipsis={{ rows: 2, expandable: false }}>
                                            {item.description}
                                        </Paragraph>

                                    }
                                />

                            </Card>
                        </Col>

                    ))}


                </Row>
            </div>

        </ConfigProvider>
    );
};

export default Services;