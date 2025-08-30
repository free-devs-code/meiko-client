import React from "react";
import { Row, Col, Card, Avatar, Divider, ConfigProvider } from 'antd';
import { FolderOpenOutlined, DownloadOutlined } from "@ant-design/icons";

const { Meta } = Card;
const Services: React.FC = () => (
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
        <Row gutter={[16, 16]} justify="space-between" style={{ padding: '0 20px', marginTop: '30px' }}>
            <Col span={6}>
                <Card
                    style={{ width: 350, backgroundColor: '#0E151A'}}
                    cover={
                    <img
                        alt="example"
                        src="https://www.meiko.com/fileadmin/_processed_/5/7/csm_hauben_01_a3c8bbfee1.png"
                    />
                    }

                    actions={[
                        <FolderOpenOutlined key="setting" style={{color:'#FFF', fontSize: '18px'}}/>,
                        <DownloadOutlined key="edit" style={{color:'#FFF', fontSize: '18px'}} />,
                    ]}
                 >                    
                    <Meta 
                        title={<div style={{ textAlign: 'left', fontSize: '15px', letterSpacing: '0.7px', color:'#FFF'  }}>Hood Type Diswashing Machines</div>}
                        description={
                                <>
                                <div style={{ textAlign: 'left', color:'#FFF', letterSpacing: '0.7px' }}>For high volumes of washware, our hood type models keep proving their worth time and again- for dishware
                                    kitchenware, and containers. All while provideing optimum ergonomic conditions.
                                </div>
                                </>
                            }
                        />
            
                </Card>
            </Col>
            <Col span={6}>
            <Card
                    style={{ width: 350, backgroundColor: '#0E151A' }}
                    cover={
                    <img
                        alt="example"
                        src="https://www.meiko.com/fileadmin/_processed_/5/1/csm_speise_3f18f72c19.png"
                    />
                    }
                    actions={[
                        <FolderOpenOutlined key="setting" style={{color:'#FFF', fontSize: '18px'}}/>,
                        <DownloadOutlined key="edit" style={{color:'#FFF', fontSize: '18px'}} />,
                    ]}
                 >                    
                    <Meta 
                        title={<div style={{ textAlign: 'left', fontSize: '14px', letterSpacing: '0.7px', color:'#FFF'  }}>Card Title</div>}
                        description={
                                <>
                                <div style={{ textAlign: 'left', color:'#FFF' }}>This is the description</div>
                                </>
                            }
                        />
                </Card>
            </Col>
            <Col span={6}>
            <Card
                    style={{ width: 350, backgroundColor: '#0E151A' }}
                    cover={
                    <img
                        alt="example"
                        src="https://www.meiko.com/fileadmin/_processed_/b/e/csm_TopLine-10-Steckbeckenspueler_16zu9_7f75adf7bf.jpg "
                    />
                    }
                    actions={[
                        <FolderOpenOutlined key="setting" style={{color:'#FFF', fontSize: '18px'}}/>,
                        <DownloadOutlined key="edit" style={{color:'#FFF', fontSize: '18px'}} />,
                    ]}
                 >                    
                    <Meta 
                        title={<div style={{ textAlign: 'left', fontSize: '14px', letterSpacing: '0.7px', color:'#FFF'  }}>Card Title</div>}
                        description={
                                <>
                                <div style={{ textAlign: 'left', color:'#FFF' }}>This is the description</div>
                                </>
                            }
                        />
                </Card>
            </Col>

            <Col span={6}>
            <Card
                    style={{ width: 350, backgroundColor: '#0E151A' }}
                    cover={
                    <img
                        alt="example"
                        src="https://www.meiko.com/fileadmin/_processed_/4/a/csm_universal_4b067a9fb2.png"
                    />
                    }
                    actions={[
                        <FolderOpenOutlined key="setting" style={{color:'#FFF', fontSize: '18px'}}/>,
                        <DownloadOutlined key="edit" style={{color:'#FFF', fontSize: '18px'}} />,
                    ]}
                 >                    
                    <Meta 
                        title={<div style={{ textAlign: 'left', fontSize: '14px', letterSpacing: '0.7p  x', color:'#FFF'  }}>Card Title</div>}
                        description={
                                <>
                                <div style={{ textAlign: 'left', color:'#FFF' }}>This is the description</div>
                                </>
                            }
                        />
                </Card>
            </Col>
        </Row>
        </div>

    </ConfigProvider>
);

export default Services;