import React, { useState } from "react";
import { Row, Col, Card, Typography, ConfigProvider, Input } from 'antd';
import { FolderOpenOutlined, DownloadOutlined, SearchOutlined } from "@ant-design/icons";

import '../App.css'
const { Paragraph } = Typography;
const { Meta } = Card;

const { Search } = Input;



const Services: React.FC = () => {
    const [ search, setSearch ] = useState<string | "">("");

    const data = [
        {
            title : "Hood Type Diswashing Machines",
            description: "For high volumes of washware, our hood type models keep proving their worth time and again- for dishware kitchenware, and containers. All while provideing optimum ergonomic conditions.",
            imge: "https://www.meiko.com/fileadmin/_processed_/5/7/csm_hauben_01_a3c8bbfee1.png"
        },

        {
            title : "MEIKO BioMaster®",
            description: "Whether you serve 100 or more than 10,000 covers per day – we have the right solution for your needs with the BioMaster® waste treatment system.",
            imge: "https://www.meiko.com/fileadmin/_processed_/5/1/csm_speise_3f18f72c19.png"

        },

        {
            title : "Meiko TopLine",
            description: "A high-performance washer-disinfector by MEIKO – with integrated drying and cooling, system disinfection, telescopic rotary nozzle and much more. Reduce the chances of an outbreak starting in the utility room to practically zero.",
            imge: "https://www.meiko.com/fileadmin/_processed_/b/e/csm_TopLine-10-Steckbeckenspueler_16zu9_7f75adf7bf.jpg"

        },

        {
            title : "Utensil Washers",
            description: "If you need to clean tough dirt and bulky washware, it's time to bring out the big guns. Our high-performance utensil washers will handle all of your pots, containers, pans and more.",
            imge: "https://www.meiko.com/fileadmin/_processed_/4/a/csm_universal_4b067a9fb2.png"

        }
    ];

    const filteredData = data.filter (
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item .description.toLowerCase().includes(search.toLowerCase())
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
                <Row gutter={24} justify="end" style={{ marginBottom: 30, padding: "30px", marginRight: "30px" }}>
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
                            style={{ width: 350, backgroundColor: '#0E151A'}}
                            cover={
                            <img
                                alt="example"
                                src={item.imge}
                            />
                            }

                            actions={[
                                <FolderOpenOutlined key="setting" style={{color:'#FFF', fontSize: '18px'}}/>,
                                <DownloadOutlined key="edit" style={{color:'#FFF', fontSize: '18px'}} />,
                            ]}
                        >                    
                            <Meta 
                                title={<div style={{ textAlign: 'left', fontSize: '15px', letterSpacing: '0.7px', color:'#FFF'  }}>{item.title}</div>}
                                description={   
                                    <Paragraph style={{ textAlign: 'left', color:'#FFF', letterSpacing: '0.7px' }} ellipsis={{ rows: 2, expandable: false }}>
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