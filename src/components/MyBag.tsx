import React from "react";
import { Badge, Button, Drawer, List } from "antd";
import { ShoppingFilled, DeleteOutlined } from "@ant-design/icons";
import { useBag } from "../context/BagContextType";
import { Item, FileItem, FolderItem } from "./../types/serviceTypes";

const MyBag: React.FC = () => {
  const { bagItems, setBagItems, isDrawerOpen, setIsDrawerOpen } = useBag();

  const handleDelete = (id: string) => {
    setBagItems(prev => {
      // Recursive function to remove an id from children array
      const removeIdFromChildren = (children: Item[]): Item[] => {
        return children
          .map(child => {
            if ("children" in child && Array.isArray(child.children)) {
              // Only folders have children, recurse
              return {
                ...child,
                children: removeIdFromChildren(child.children),
              } as FolderItem;
            }
            return child; // file, keep as-is
          })
          .filter(child => {
            // Remove the item if id matches
            if (child.id === id) return false;

            // Optionally remove empty folders
            if ("children" in child && Array.isArray(child.children)) {
              return child.children.length > 0;
            }

            return true;
          });
      };

      // Remove from top-level
      const updated = prev
        .map(item => {
          if ("children" in item && Array.isArray(item.children)) {
            return {
              ...item,
              children: removeIdFromChildren(item.children),
            } as FolderItem;
          }
          return item; // file stays as-is
        })
        .filter(item => {
          if ("children" in item && Array.isArray(item.children)) {
            return item.children.length > 0;
          }
          return true;
        });

      localStorage.setItem("bagItems", JSON.stringify(updated));
      return updated;
    });
  };


  // Recursive function to render items
  const renderItem = (item: Item, level = 0) => {
    const paddingLeft = level * 20;

    if ("fileName" in item) {
      return (
        <List.Item
          key={item.id}
          style={{ paddingLeft }}
          actions={[<Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} />]}
        >
          {item.fileName}
        </List.Item>
      );
    } else {
      // Folder
      return (
        <List.Item key={item.id} style={{ flexDirection: "column", alignItems: "start", paddingLeft }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>
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
            <List
              dataSource={item.children}
              renderItem={child => renderItem(child, level + 1)} // recursive call
            />
          )}
        </List.Item>
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
        {bagItems.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <List<Item>
            dataSource={bagItems}
            renderItem={item => renderItem(item)}
          />
        )}
      </Drawer>
    </>
  );
};

export default MyBag;
