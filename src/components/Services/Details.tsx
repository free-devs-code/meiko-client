import { useParams } from "react-router-dom";
import { useState } from "react";
import { Row, Col, Card, Breadcrumb, Typography, Checkbox, Button } from "antd";
import { FolderOpenFilled, DownloadOutlined, ShoppingFilled, LeftOutlined } from "@ant-design/icons";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useBag } from "../../context/BagContextType";

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
  const {bagItems, setBagItems, setIsDrawerOpen} = useBag();

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

  const getSelectedItems = (ids: string[]): Array<FolderItem | FileItem> => {
    return ids
      .map((id) => findItemById(service.folders as Array<FolderItem | FileItem>, id))
      .filter((item): item is FolderItem | FileItem => item !== null);
  };

  const mergeUnique = (prev: Array<FolderItem | FileItem>, newItems: Array<FolderItem | FileItem>) => {
    const existingIds = new Set(prev.map((item) => item.id));
    return [...prev, ...newItems.filter((item) => !existingIds.has(item.id))];
  };

  // Collect all files from a folder or array of nodes
  const collectAllFiles = (nodes: Array<FolderItem | FileItem>, existingIds = new Set<string>()): FileItem[] => {
    let files: FileItem[] = [];

    for (const node of nodes) {
      if ("fileName" in node) {
        if (!existingIds.has(node.id)) {
          files.push(node);
          existingIds.add(node.id);
        }
      } else if ("children" in node && Array.isArray(node.children)) {
        files = files.concat(collectAllFiles(node.children, existingIds));
      }
    }

    return files;
  };

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

          <h1 style={{ marginTop: 120, textTransform: "uppercase", fontWeight: service.title.length > 15 ? 600 : 800, fontSize: '4.2rem', letterSpacing: 0.9 }}>{service.title}</h1>

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
                textShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)"
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
                  // Collect all files from selected parent folders
                  const itemsToAdd: FolderItem[] = [];

                  service.folders.forEach(folder => {
                  if (selectedParentIds.includes(folder.id)) {
                    // Keep the folder structure intact
                    itemsToAdd.push(folder);
                  }
                });

                setBagItems(prev => {
                  // Prevent duplicates by id
                  const newItems = itemsToAdd.filter(f => !prev.some(item => item.id === f.id));
                  const updated = [...prev, ...newItems];

                  localStorage.setItem("bagItems", JSON.stringify(updated));
                  return updated;
                });

                setIsDrawerOpen(true);
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
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              key={folder.id}
            >
              <Card
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  minHeight: "380px",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#0083bb",
                  position: "relative", // ✅ required for overlay
                }}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      onClick={() => {
                        setDetailId(folder.id);
                        updateBreadcrumbs(folder.id, folder.folderName);
                      }}
                      alt="example"
                      src={folder.image}
                      style={{
                        width: "100%",
                        height: "clamp(180px, 25vw, 260px)",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                    {/* ✅ Overlay download button */}
                    <DownloadOutlined
                      onClick={() => {
                        setSelectedParentIds((prev) =>
                          prev.includes(folder.id)
                            ? prev.filter((id) => id !== folder.id)
                            : [...prev, folder.id]
                        );
                      }}
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        fontSize: "24px",
                        color: "#fff",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        padding: "6px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(0,0,0,0.8)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(0,0,0,0.6)")
                      }
                    />
                  </div>
                }
              >
                {/* Card content */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
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
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#FFF",
                        flex: 1,
                        textAlign: "left",
                      }}
                    >
                      {folder.folderName}
                    </span>
                  </div>
                  <span style={{ fontSize: "14px", color: "#FFF" }}>{folder.items}</span>
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

  const title =
  "folderName" in selectedItem
    ? selectedItem.folderName
    : selectedItem.fileName;

  return (
    <div>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Header />
        <Sidebar collapsed={collapsed} onCollapse={toggleCollapsed} />
      </div>

      <div style={{
        marginLeft: collapsed ? '50px' : '225px',
      }}>
        <h1 style={{ marginTop: 120, textTransform: "uppercase", fontWeight: 600, fontSize: '3rem', letterSpacing: 0.9 }}>{title}</h1>
       

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
                textShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)"
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
                      fontSize: "20px",
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
                style={{ marginBottom: "18px", marginLeft: "6px", marginTop: "-14px", fontSize: 15 }}
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
                          const itemsToAdd: FolderItem[] = [];

                          if (detailId) {
                            const parentFolder = findItemById(service.folders, detailId) as FolderItem;
                            if (parentFolder) {
                              // Only include selected children
                              const selectedChildren = parentFolder.children.filter(child => selectedChildIds.includes(child.id));

                              // Clone the parent folder but only with selected children
                              itemsToAdd.push({
                                ...parentFolder,
                                children: selectedChildren
                              });
                            }
                          }

                          setBagItems(prev => {
                          if (!detailId) return prev;

                          // Find parent folder
                          const parentFolder = findItemById(service.folders, detailId) as FolderItem;
                          if (!parentFolder) return prev;

                          // Only include selected children
                          const childrenToAdd = parentFolder.children.filter(child => selectedChildIds.includes(child.id));

                          // Clone parent folder with only selected children
                          const folderToAdd: FolderItem = {
                            ...parentFolder,
                            children: childrenToAdd
                          };

                            // Merge with existing bag
                            const existingIndex = prev.findIndex(item => item.id === folderToAdd.id);

                            let updated;
                            if (existingIndex >= 0) {
                              const existingFolder = prev[existingIndex] as FolderItem;

                              // Merge children, avoiding duplicates
                              const mergedChildren = [
                                ...existingFolder.children.filter(c => !childrenToAdd.some(sc => sc.id === c.id)),
                                ...childrenToAdd
                              ];

                              updated = [...prev];
                              updated[existingIndex] = { ...existingFolder, children: mergedChildren };
                            } else {
                              updated = [...prev, folderToAdd];
                            }

                            localStorage.setItem("bagItems", JSON.stringify(updated));
                            return updated;
                          });

                          setIsDrawerOpen(true);
                      }}
                  >
                    <ShoppingFilled style={{ fontSize: "16px" }} />
                    Add to Bag Selected ({selectedChildIds.length})
                  </button>
                )}
              </div>

            </div>
            

            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
            {(selectedItem.children as Array<FolderItem | FileItem>).map((child) => {
                const isFile = "fileName" in child;
                const childLabel = isFile ? child.fileName : child.folderName;
                const childImage = isFile ? child.image : child.image;
                const childCount = isFile ? child.fileSize : child.items;
                const canEnter =
                  Array.isArray((child as any).children) &&
                  (child as any).children.length > 0;

                return (
                  <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                  key={child.id}
                >
                  <Card
                    
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 20px rgba(0,0,0,0.3)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.15)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      minHeight: "380px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#0083bb",
                      position: "relative", // ✅ required for overlay
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                    cover={
                      <div style={{ 
                        position: "relative",
                        width: "100%",
                        height: "clamp(180px, 25vw, 260px)",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#FFF",
                        cursor: isFile ? "default" : "pointer",
                                            
                        }}>
                        <img
                          {...(!isFile && {
                            onClick: () => {
                              setDetailId(child.id);
                              updateBreadcrumbs(child.id, childLabel);
                            },
                          })}
                          alt="example"
                          src={childImage}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                           
                          }}
                        />
                        {/* ✅ Overlay download button */}
                        <DownloadOutlined
                          onClick={() => {
                            if (selectedChildIds.includes(child.id)) {
                              // ✅ remove if already selected
                              setSelectedChildIds(selectedChildIds.filter((id) => id !== child.id));
                            } else {
                              // ✅ add if not selected
                              setSelectedChildIds([...selectedChildIds, child.id]);
                            }
                          }}
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            right: "8px",
                            fontSize: "24px",
                            color: "#fff",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            padding: "6px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor =
                              "rgba(0,0,0,0.8)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor =
                              "rgba(0,0,0,0.6)")
                          }
                        />
                      </div>
                    }
                  >
                    {/* Card content */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          checked={selectedChildIds.includes(child.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedChildIds([...selectedChildIds, child.id]);
                            } else {
                              setSelectedChildIds(selectedChildIds.filter((id) => id !== child.id));
                            }
                          }}
                        style={{ display: "flex", marginRight: "8px", justifyContent: "flex-start", marginBottom: "8px", color: "#FFF" }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#FFF",
                            flex: 1,
                            textAlign: "left",
                          }}
                        >
                          {childLabel}
                        </span>
                      </div>
                      <span style={{ fontSize: "14px", color: "#FFF" }}>{childCount}</span>
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
