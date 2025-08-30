import React from "react";
import { Layout, Col, Row, Button, Badge } from "antd";
import { ShoppingFilled } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
     <Header style={{ padding: '10px 20px', width: '100%', backgroundColor: '#FFF', position: 'fixed', height: '70px', top: 0, left: 0, zIndex: 1000}}>
      <Row justify="space-between" align="middle" style={{ display: 'flex'}}>
        {/* Left: Logo */}
        <Col>
           <img 
            src="/public/MEIKO_Logo.jpg" 
            alt="Logo" 
            style={{ height: '60px', margin: 0 }}  // Adjust height as needed
          />
        </Col>

        {/* Right: Shopping Cart */}
        <Col
          xs={12}  // Full width on small screens (mobile)
          sm={12}  // Half width on small screens
          md={8}   // One-third width on medium screens
          lg={4}   // Quarter width on large screens (desktop)
          style={{ textAlign: 'right', paddingRight: '40px' }}  // Adjust padding on all screen sizes
        >
          <Badge count={5} >
            <Button
              type="link"
              icon={<ShoppingFilled style={{ fontSize: '30px', color: '#1F2E36' }} />}
            />
          </Badge>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
