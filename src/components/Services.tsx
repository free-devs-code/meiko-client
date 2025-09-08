import React, { useState } from "react";
import { Row, Col, Card, Typography, ConfigProvider, Input } from 'antd';
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
                        actionsBg: '#0E151A', // your custom background color
                    },
                },
            }}
        >
            <div>
                <Row gutter={24} justify="end" style={{ marginBottom: 30, padding: "50px", marginRight: "30px" }}>
                    <Search
                        placeholder="Search products"
                        allowClear
                        enterButton={<SearchOutlined />}
                        onChange={(e) => setSearch(e.target.value)}
                        size="large"
                        style={{ width: 600, fontSize: '25px' }}
                    />
                </Row>

                <Row gutter={[16, 16]} justify="space-between" style={{ padding: '0 20px', marginTop: '30px' }}>
                    {filteredData.map((item, index) => (
                        <Col span={6}>
                            <Card key={index}
                                style={{ width: 350, backgroundColor: '#0E151A' }}
                                cover={
                                    <img
                                        alt="example"
                                        src={item.image}
                                    />
                                }

                                actions={[
                                    <Link to={`components/Services/${item.id}`}>
                                        <FolderOpenOutlined key="setting" style={{ color: '#FFF', fontSize: '18px' }} />
                                    </Link>,
                                    <DownloadOutlined key="edit" style={{ color: '#FFF', fontSize: '18px' }} />,
                                ]}
                            >
                                <Meta
                                    title={<div style={{ textAlign: 'left', fontSize: '15px', letterSpacing: '0.7px', color: '#FFF' }}>{item.title}</div>}
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