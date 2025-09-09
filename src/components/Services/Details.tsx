import { useParams } from "react-router-dom";
import { useState } from "react";
import { Row, Col, Card, Breadcrumb, Typography } from "antd";
import { FolderOpenFilled, DownloadOutlined } from "@ant-design/icons";
import Header from "../Header";
import Sidebar from "../Sidebar";

const { Meta } = Card;
const { Paragraph } = Typography;

import { servicesData } from "../../data/serviceData";
import type { FolderItem, ServiceData, FileItem, BreadcrumbData } from "../../types/serviceTypes";
import { useNavigate } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  // Toggle sidebar collapse state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [backHover, setBackHover] = useState(false);

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData[]>([]);

  const [detailId, setDetailId] = useState<string | null>(null);

  const service = servicesData.find((s: ServiceData) => s.id.toString() === id);

  if (!service) {
    return <div>Product not found</div>;
  }

  // recursive finder for any node (folder OR file)
  const findItemById = (nodes: Array<FolderItem | FileItem>, targetId: string | null): FolderItem | FileItem | null => {
    if (!targetId) return null;

    for (const node of nodes) {
      if (node.id === targetId) return node;

      if ("children" in node && Array.isArray(node.children)) {
        const found = findItemById(node.children as Array<FolderItem | FileItem>, targetId);
        if (found) return found;
      }
    }

    return null;
  };

  // recursive count function
  const countItems = (folders: FolderItem[]) => {
    let fileCount = 0;
    let folderCount = folders.length;

    folders.forEach((folder) => {
      folder.children.forEach((child) => {
        if ("fileName" in child) {
          fileCount++;
        } else {
          folderCount++;
          const nested = countItems([child]);
          fileCount += nested.fileCount;
          folderCount += nested.folderCount;
        }
      });
    });

    return { fileCount, folderCount };
  };

  const handleFolderClick = (folder: FolderItem) => {
    setDetailId(folder.id);
    setBreadcrumbs((prev) => [...prev, { id: folder.id, label: folder.folderName }]);
  };

  //goes back one breadcrumb previously visited
  // const goBackBreadcrumbs = () => {
  //   setBreadcrumbs((prev) => prev.slice(0, prev.length - 1));
  // }

  //jumps to a specific breadcrumb
  const handleBreadcrumbClick = (index: number) => {
    setBreadcrumbs((prev) => {
      const newBreadcrumbs = prev.slice(0, index + 1); // keep up to clicked breadcrumb
      const lastCrumb = newBreadcrumbs[newBreadcrumbs.length - 1]; // get the last breadcrumb

      if (lastCrumb) {
        setDetailId(lastCrumb.id); // set detailId to last breadcrumb's id
      }
      else {
        setDetailId(null); // if no breadcrumbs left, reset detailId
      }

      return newBreadcrumbs;
    })
  }

  //adds a new breadcrumb to the list
  const updateBreadcrumbs = (id: string, label: string) => {
    setBreadcrumbs((prev) => [...prev, { id, label }]);
  };

  const getItemLabel = (item: FolderItem | FileItem) =>
    "fileName" in item ? item.fileName : item.folderName;

  // FOLDER/FILE VIEW
  const selectedItem = findItemById(
    service.folders as Array<FolderItem | FileItem>,
    detailId as string
  );

  // ==== UI Rendering ===
  // when no folder is clicked → show folders
  if (!detailId) {
    const counts = countItems(service.folders);

    return (

      <div>
        <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
          <Header />
          <Sidebar collapsed={collapsed} onCollapse={toggleCollapsed} />
        </div>

        <div style={{
          marginLeft: collapsed ? '50px' : '225px',
        }}>

          <h1 style={{ marginTop: "80px" }}>{service.title}</h1>
          <p>{service.description}</p>

          {/* <img src={service.image} alt={service.title} width="300" />

        <p>📂 Total Folders: {counts.folderCount}</p>
        <p>📄 Total Files: {counts.fileCount}</p> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px", // spacing between button and folder name
            }}
          >
            <button style={
              {
                background: backHover ? "#009FE4" : "#047CB1",
                border: "none",
                borderRadius: "6px",
                color: "#FFF",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "15px",
                marginLeft: "24px",
                padding: "8px 16px",
                boxShadow: backHover ? "0px 4px 12px rgba(0, 0, 0, 0.3)" : "none",
                transition: "all 0.2s ease-in-out",
              }
            } 
            onMouseEnter={() => setBackHover(true)}
            onMouseLeave={() => setBackHover(false)}
            onClick={() => navigate("/")}>⬅ Back to Services</button>

            <Breadcrumb
              style={{ marginBottom: "15px" }}
              items={[
                {
                  key: "root",
                  title: (
                    <button
                      onClick={() => {
                        setDetailId(null);
                        setBreadcrumbs([]);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#047CB1",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginLeft: "8px",
                      }}
                    >
                      {service.title}
                    </button>
                  ),
                },
              ]}
            />
          </div>

          <Row gutter={[16, 16]} style={{ padding: "20px", marginTop: "20px" }}>
            {service.folders.map((folder) => (
              <Col span={6} key={folder.id}>
                <Card hoverable style={{ background: "#1F2E36", color: "#FFF" }}>
                  <Meta
                    title={<div style={{ color: "#FFF", fontWeight: "bold" }}>{folder.folderName}</div>}
                    description={
                      <div style={{ color: "#FFF", fontSize: "12px" }}>
                        {`${folder.children.length} items`}
                      </div>
                    }
                  />

                  {/* Footer row with icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "12px",
                      background: "#FFF",
                      border: "2px solid #1F2E36", // outlined color
                      borderRadius: "6px",       // optional rounded corners
                      padding: "6px 12px",       // spacing inside footer
                      outline: "2px solid white",          // remove default outline
                    }}
                  >
                    <FolderOpenFilled
                      onClick={() => {
                        setDetailId(folder.id);
                        updateBreadcrumbs(folder.id, folder.folderName);
                      }}
                      style={{ color: "#009FE4", fontSize: "22px", cursor: "pointer", paddingLeft: "12px" }}
                    />

                    <DownloadOutlined
                      style={{ color: "#1F2E36", fontSize: "22px", cursor: "pointer", paddingRight: "12px" }}
                      onClick={() => console.log("Downloading", folder)}
                    />
                  </div>
                </Card>

              </Col>
            ))}
          </Row>

        </div>
      </div>
    );
  }

  if (!selectedItem) {
    return <p>Item not found</p>;
  }

  return (
    <div>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Header />
        <Sidebar collapsed={collapsed} onCollapse={toggleCollapsed} />
      </div>

      <div style={{
        marginLeft: collapsed ? '50px' : '225px',
      }}>
        <h1>{service.title}</h1>
        <h2>
          {"folderName" in selectedItem
            ? selectedItem.folderName
            : selectedItem.fileName}
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px", // spacing between button and folder name
          }}
        >
          <button style={
            {
              background: "none",
              border: "2px solid #1F2E36",
              borderRadius: "6px",
              color: "#1F2E36",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "15px",
              marginLeft: "24px",
            }
          } onClick={() => navigate("/")}>⬅ Back to Services</button>
          <Breadcrumb
            style={{ marginBottom: "15px" }}
            items={[
              {
                key: "root",
                title: (
                  <button
                    onClick={() => {
                      setDetailId(null);
                      setBreadcrumbs([]);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#047CB1",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "8px",
                    }}
                  >
                    {service.title}
                  </button>
                ),
              },
              ...breadcrumbs.map((crumb, index) => ({
                key: crumb.id,
                title: (
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#047CB1",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {crumb.label}
                  </button>
                ),
              })),
            ]}
          />
        </div>

        {selectedItem && Array.isArray((selectedItem as any).children) && (selectedItem as any).children.length > 0 ? (
          <Row gutter={[16, 16]} style={{ padding: "20px", marginTop: "20px" }}>
            {(selectedItem.children as Array<FolderItem | FileItem>).map((child) => {
              const isFile = "fileName" in child;
              const childLabel = isFile ? child.fileName : child.folderName;
              const canEnter =
                Array.isArray((child as any).children) &&
                (child as any).children.length > 0;

              return (
                <Col span={6} key={child.id}>
                  <Card
                    hoverable
                    style={{ background: "#1F2E36", color: "#FFF" }}
                  >
                    <Meta
                      title={<div style={{ color: "#FFF" }}>{childLabel}</div>}
                      description={
                        <div style={{ color: "#FFF", fontSize: "12px" }}>
                          {isFile
                            ? (child as FileItem).fileSize
                            : `${(child as FolderItem).children?.length || 0} items`}
                        </div>
                      }
                    />

                    {/* Footer row with icons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "12px",
                        background: "#FFF",
                        border: "2px solid #1F2E36", // outlined color
                        borderRadius: "6px",       // optional rounded corners
                        padding: "6px 12px",       // spacing inside footer
                        outline: "2px solid white",          // remove default outline
                      }}
                    >
                      <FolderOpenFilled
                        style={{ color: "#009FE4", fontSize: "24px", cursor: "pointer", paddingLeft: "12px" }}
                        onClick={() => {
                          if (canEnter) {
                            setDetailId(child.id);
                            updateBreadcrumbs(child.id, getItemLabel(child));
                          }
                        }}
                      />

                      <DownloadOutlined
                        style={{ color: "#1F2E36", fontSize: "24px", cursor: "pointer", paddingRight: "12px" }}
                        onClick={() => console.log("Download/open", child)}
                      />
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

        ) : (
          <p>📄 No children available</p>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
