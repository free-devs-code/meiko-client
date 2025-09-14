import React from "react";
import { Layout } from "antd";
import { CopyrightOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
    return (
        <AntFooter
            style={{
                textAlign: "center",
                backgroundColor: "#0E151A", // solid dark color
                color: "#FFF",             // white text
                fontWeight: "500",
                letterSpacing: "0.5px",
                marginBottom: "-32px"
            }}
        >
            <CopyrightOutlined /> {new Date().getFullYear()} Meiko — All Rights Reserved
        </AntFooter>
    );
};

export default Footer;
