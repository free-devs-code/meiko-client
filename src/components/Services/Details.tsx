import { useParams } from "react-router-dom";
import { useState } from "react";
import { Breadcrumb } from "antd";

import { servicesData } from "../../data/serviceData";
import type { FolderItem, ServiceData, FileItem } from "../../types/serviceTypes";
import { useNavigate } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  type Breadcrumb = {
    id: string;
    folderName: string;
  };

  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

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
    setBreadcrumbs((prev) => [...prev, { id: folder.id, folderName: folder.folderName }]);
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
  const updateBreadcrumbs = (id: string, folderName: string) => {
    setBreadcrumbs((prev) => [...prev, { id, folderName }]);
  }

  // ==== UI Rendering ===
  // when no folder is clicked → show folders
  if (!detailId) {
    const counts = countItems(service.folders);

    return (
      <div>
        <button onClick={() => navigate("/")}>
          ⬅ Back to Services
        </button>

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
                  style={{ background: "none", border: "none", color: "blue", cursor: "pointer", }}
                >
                  {service.title}
                </button>
              ),
            },
          ]}
        />

        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <img src={service.image} alt={service.title} width="300" />

        <p>📂 Total Folders: {counts.folderCount}</p>
        <p>📄 Total Files: {counts.fileCount}</p>

        {service.folders.map((folder) => (
          <p key={folder.id}>
            <button
              onClick={() => {
                setDetailId(folder.id);
                updateBreadcrumbs(folder.id, folder.folderName);
              }}
            >
              {folder.folderName} ({folder.children.length} items)
            </button>
          </p>
        ))}
      </div>
    );
  }

  // if a folder is clicked → show its contents
  const selectedItem = findItemById(service.folders as Array<FolderItem | FileItem>, detailId as string);

  if (!selectedItem) {
    return <p>Item not found</p>;
  }

  return (
    <div>
      <h1>{service.title}</h1>

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
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer", }}
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
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer", }}
              >
                {crumb.folderName}
              </button>
            ),
          })),
        ]}
      />

      {/* <button onClick={() => { setDetailId(null); goBackBreadcrumbs(); }}>⬅ Back</button> */}

      <h2>{selectedItem
        ? ("folderName" in selectedItem ? selectedItem.folderName : selectedItem.fileName)
        : ""}</h2>

      <ul>
        {selectedItem && Array.isArray((selectedItem as any).children) && (selectedItem as any).children.length > 0 ? (
          // selectedItem.children is Item[] (FolderItem | FileItem)
          (selectedItem.children as Array<FolderItem | FileItem>).map((child) => {
            const isFile = "fileName" in child;
            const childLabel = isFile ? `${child.fileName} (${child.fileSize})` : child.folderName;

            // can we navigate into this child? (it has children array with length)
            const canEnter = Array.isArray((child as any).children) && (child as any).children.length > 0;

            return (
              <li key={child.id}>
                {isFile ? "📄" : "📁"}{" "}
                <button
                  onClick={() => {
                    if (canEnter) {
                      // go deeper
                      setDetailId(child.id);
                      updateBreadcrumbs(child.id, isFile ? child.fileName : child.folderName);
                    } else {
                      // leaf file without children => do something (download, open preview...)
                      // example: console.log('open/download', child);
                    }
                  }}
                >
                  {childLabel}
                </button>
              </li>
            );
          })
        ) : (
          <p>📄 No children available</p>
        )}
      </ul>

    </div>
  );
}

export default ServiceDetails;
