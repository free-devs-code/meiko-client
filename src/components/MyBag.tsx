import React, { useState } from "react";
import { Badge, Button, Drawer, Alert, Spin } from "antd";
import { ShoppingFilled, DeleteOutlined, DownloadOutlined  } from "@ant-design/icons";
import { useBag } from "../context/BagContextType";
import { Item, FileItem, FolderItem } from "./../types/serviceTypes";
import "antd/dist/reset.css";
import "../App.css";


const MyBag: React.FC = () => {
  const { bagItems, setBagItems, isDrawerOpen, setIsDrawerOpen } = useBag();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "done">("idle");

  const handleDelete = (id: string) => {
    setBagItems((prev) => {
      const removeById = (items: Item[]): Item[] => {
        return items
          .map((item) => {
            if ("children" in item && Array.isArray(item.children)) {
              return {
                ...item,
                children: removeById(item.children),
              } as FolderItem;
            }
            return item;
          })
          .filter((item) => {
            if (item.id === id) return false;
            if ("children" in item && Array.isArray(item.children)) {
              return item.children.length > 0;
            }
            return true;
          });
      };

      const updated = removeById(prev);
      localStorage.setItem("bagItems", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDownload = () => {
    if (bagItems.length === 0) return;
    setIsDownloading(true);
    setDownloadStatus("downloading");

    // simulate download delay
    setTimeout(() => {
      // clear bag
      setIsDownloading(false);
      setDownloadStatus("done");

      setBagItems([]);
      localStorage.removeItem("bagItems");
      // keep alert visible until user closes it or drawer closes
    }, 5000);
  };

  // ✅ Fixed recursive render
  const renderItem = (item: Item, level = 0): React.ReactNode => {
    const paddingLeft = level * 20;

    if ("fileName" in item) {
      return (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft,
            marginBottom: 8,
          }}
        >
          <span>{item.fileName}</span>
          <Button
            danger
            size="small"
            style={{ marginLeft: "auto" }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(item.id)}
          />
        </div>
      );
    } else {
      return (
        <div key={item.id} style={{ paddingLeft, marginBottom: 12 }}>
          <div style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
            {item.folderName}
            <Button
              danger
              size="small"
              style={{ marginLeft: 10 }}
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.id)}
            />
          </div>

          {item.children && item.children.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {item.children.map((child) => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Badge count={bagItems.length} offset={[0, 6]}>
        <Button
          type="link"
          icon={<ShoppingFilled style={{ fontSize: "30px", color: "#1F2E36" }} />}
          onClick={() => setIsDrawerOpen(true)}
        />
      </Badge>

      <Drawer
        title="Your Bag"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width="33.3%"
      >
        {bagItems.length > 0 && (
          <div style={{ marginBottom: 16, textAlign: "right" }}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              loading={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        )}

        {/* Inline status messages inside the drawer */}
        {downloadStatus === "downloading" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Spin size="small" />
            <div>Downloading... please wait</div>
          </div>
        )}

        {downloadStatus === "done" && (
          <Alert
            message="Downloaded"
            description="Your items were downloaded and your bag has been cleared."
            type="success"
            showIcon
            closable
            onClose={() => setDownloadStatus("idle")}
            style={{ marginBottom: 12 }}
          />
        )}

        {bagItems.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <div>{bagItems.map((item) => renderItem(item))}</div>
        )}
      </Drawer>
    </>
  );
};

export default MyBag;
