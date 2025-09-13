import { useParams } from "react-router-dom";
import { useState } from "react";
import { Row, Col, Card, Breadcrumb, Typography, Checkbox, Button } from "antd";
import { FolderOpenFilled, DownloadOutlined, ShoppingFilled, LeftOutlined } from "@ant-design/icons";
import Header from "../Header";
import Sidebar from "../Sidebar";

const { Meta } = Card;

import { servicesData } from "../../data/serviceData";
import type { FolderItem, ServiceData, FileItem, BreadcrumbData } from "../../types/serviceTypes";
import { useNavigate } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const [backHover, setBackHover] = useState(false);

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData[]>([]);

  const [detailId, setDetailId] = useState<string | null>(null);

  //state for selected parent ids for checkbox selection
  const [selectedParentIds, setSelectedParentIds] = useState<string[]>([]);

  //state for selected child ids for checkbox selection
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);

  const service = servicesData.find((s: ServiceData) => s.id.toString() === id);

  //state for selected items to add to bag
  const [bagItems, setBagItems] = useState<Array<FolderItem | FileItem>>([]);

  // Collect IDs recursively from folder tree
  const collectAllIds = (nodes: Array<FolderItem | FileItem>): string[] => {
    let ids: string[] = [];
    for (const node of nodes) {
      ids.push(node.id);
      if ("children" in node && Array.isArray(node.children)) {
        ids = ids.concat(collectAllIds(node.children));
      }
    }
    return ids;
  };

  // Toggle sidebar collapse state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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

          <h1 style={{ marginTop: 120, textTransform: "uppercase", fontWeight: 800, fontSize: '4.2rem', letterSpacing: 0.9 }}>{service.title}</h1>

          {/* <img src={service.image} alt={service.title} width="300" />

        <p>📂 Total Folders: {counts.folderCount}</p>
        <p>📄 Total Files: {counts.fileCount}</p> */}


          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "150px",
              marginBottom: "15px",
            }}
          >
            <Button
              style={{
                color: "#009FE4",
                cursor: "pointer",
                fontSize: 20,
                fontWeight: 600,
                padding: 0,
              }}
              onClick={() => navigate("/")}
              type="link"
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "1px solid #009FE4",
                  paddingBottom: "2px",
                }}
              >

                <LeftOutlined /> Back to Services

              </span>
            </Button>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
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
                        fontSize: '1.2rem',
                        fontWeight: "bold",
                        marginLeft: "20px",
                      }}
                    >
                      {service.title}
                    </button>
                  ),
                },
              ]}
            />
          </div>

          {/* Select All for parent folders */}
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "12px", margin: "4px 0px 4px 0px" }}>
            <Checkbox
              indeterminate={
                selectedParentIds.length > 0 && selectedParentIds.length < service.folders.length
              }
              checked={selectedParentIds.length === service.folders.length}
              onChange={(e) =>
                setSelectedParentIds(e.target.checked ? service.folders.map((f) => f.id) : [])
              }
              style={{ marginLeft: "24px", marginTop: "4px", fontSize: 15 }}
            >
              Select All (from this folder)
            </Checkbox>

            {selectedParentIds.length > 0 && (
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#047CB1",
                  border: "none",
                  borderRadius: "6px",
                  color: "#FFF",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}
                onClick={() => {
                  selectedParentIds.forEach((id) => {
                    const item = service.folders.find((f) => f.id === id);
                    if (item) {
                      console.log("Adding to Bag", item);
                      // TODO: actual add-to-bag logic
                    }
                  });
                }}
              >
                <ShoppingFilled style={{ fontSize: "16px" }} />
                Add to Bag Selected ({selectedParentIds.length})
              </button>
            )}
          </div>

          <Row gutter={[16, 16]} style={{ padding: "20px" }}>
            {service.folders.map((folder) => (
              <Col
                xs={24}   // full width on extra small screens
                sm={12}   // 2 cards per row on small screens
                md={8}    // 3 cards per row on medium screens
                lg={6}    // 3 cards per row on large screens
                xl={6}
                key={folder.id}>
                <Card
                  style={{
                    width: "100%",
                    maxWidth: "320px",              // optional max
                    minHeight: "380px",             // uniform card height
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: '#a1d9f7'
                  }}
                  cover={
                    <img
                      alt="example"
                      src={folder.image}
                      style={{
                        width: "100%",
                        height: "clamp(180px, 25vw, 260px)", // ✅ min 180px, grows with screen, max 260px
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        checked={selectedParentIds.includes(folder.id)}
                        onChange={() => {
                          setSelectedParentIds((prev) =>
                            prev.includes(folder.id)
                              ? prev.filter((id) => id !== folder.id)
                              : [...prev, folder.id]
                          );
                        }}
                        style={{ marginRight: "8px" }}
                      />
                      <span style={{ fontWeight: "bold", color: "#1F2E36", flex: 1, textAlign: "left" }}>
                        {folder.folderName}
                      </span>
                    </div>
                    <span style={{ fontSize: "14px", color: "#555" }}>{folder.items} asdasdasd</span>
                  </div>

                  {/* Footer row with icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "12px",
                      borderRadius: "6px",
                      padding: "6px 12px", 
                    }}
                  >
                    <FolderOpenFilled
                      onClick={() => {
                        setDetailId(folder.id);
                        updateBreadcrumbs(folder.id, folder.folderName);
                      }}
                      style={{ color: "#1F2E36", fontSize: "22px", cursor: "pointer", paddingLeft: "8px" }}
                    />

                    <DownloadOutlined
                      onClick={() => console.log("Download/open", folder)}
                      style={{ color: "#1F2E36", fontSize: "22px", cursor: "pointer", paddingRight: "8px" }}
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
            display: "flex", alignItems: "center", gap: "12px",
          }}
        >
          <button style={
            {
              background: backHover ? "#009FE4" : "#047CB1", border: "none", borderRadius: "6px", color: "#FFF",
              cursor: "pointer", fontSize: "14px", fontWeight: "bold", marginBottom: "15px", marginLeft: "24px",
              padding: "8px 16px", boxShadow: backHover ? "0px 4px 12px rgba(0, 0, 0, 0.3)" : "none", transition: "all 0.2s ease-in-out",
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
          <div style={{ padding: "20px" }}>

            {/* Select All for children */}
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "12px", margin: "4px 0px 4px 0px" }}>
              <Checkbox
                indeterminate={
                  selectedChildIds.length > 0 &&
                  selectedChildIds.length < (selectedItem.children as Array<FolderItem | FileItem>).length
                }
                checked={
                  selectedChildIds.length ===
                  (selectedItem.children as Array<FolderItem | FileItem>).length
                }
                onChange={(e) => {
                  setSelectedChildIds(
                    e.target.checked
                      ? (selectedItem.children as Array<FolderItem | FileItem>).map((child) => child.id)
                      : []
                  );
                }}
                style={{ marginBottom: "18px", marginLeft: "6px", marginTop: "-14px" }}
              >
                Select All (from this folder)
              </Checkbox>

              <div style={{ display: "flex", alignItems: "start", gap: "8px", marginBottom: "18px", marginLeft: "6px", marginTop: "-18px" }}>
                {selectedChildIds.length > 0 && (
                  <button
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "8px",
                      background: "#047CB1",
                      border: "none",
                      borderRadius: "6px",
                      color: "#FFF",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "8px 16px",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    }}
                    onClick={() => {
                      selectedChildIds.forEach((id) => {
                        const item = (selectedItem.children as Array<FolderItem | FileItem>).find(
                          (child) => child.id === id
                        );
                        if (item) {
                          console.log("Adding to Bag", item);
                          // TODO: actual add-to-bag logic
                        }
                      });
                    }}
                  >
                    <ShoppingFilled style={{ fontSize: "16px" }} />
                    Add to Bag Selected ({selectedChildIds.length})
                  </button>
                )}
              </div>

            </div>
            <Row gutter={[16, 16]}>
              {(selectedItem.children as Array<FolderItem | FileItem>).map((child) => {
                const isFile = "fileName" in child;
                const childLabel = isFile ? child.fileName : child.folderName;
                const canEnter =
                  Array.isArray((child as any).children) &&
                  (child as any).children.length > 0;

                return (
                  <Col span={6} key={child.id}>
                    <Card hoverable style={{ background: "#1F2E36", color: "#FFF" }}>

                      {/* Child Checkbox */}
                      <Checkbox
                        checked={selectedChildIds.includes(child.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChildIds([...selectedChildIds, child.id]);
                          } else {
                            setSelectedChildIds(selectedChildIds.filter((id) => id !== child.id));
                          }
                        }}
                        style={{ display: "flex", justifyContent: "flex-start", marginBottom: "8px", color: "#FFF" }}
                      >
                        <span style={{ color: "#FFF", fontWeight: "bold" }}>
                          {childLabel} qwewqe
                        </span>
                      </Checkbox>

                      <Meta
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
                          border: "2px solid #1F2E36",
                          borderRadius: "6px",
                          padding: "6px 12px",
                        }}
                      >
                        <FolderOpenFilled
                          style={{ color: "#009FE4", fontSize: "24px", cursor: "pointer", paddingLeft: "8px" }}
                          onClick={() => {
                            if (canEnter) {
                              setDetailId(child.id);
                              updateBreadcrumbs(child.id, getItemLabel(child));
                              setSelectedChildIds([]); // reset when navigating deeper
                            }
                          }}
                        />

                        <DownloadOutlined
                          style={{ color: "#1F2E36", fontSize: "24px", cursor: "pointer", paddingRight: "8px" }}
                          onClick={() => console.log("Download/open", child)}
                        />
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : (
          <p>📄 No children available</p>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
