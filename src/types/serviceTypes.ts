
export type FileItem = {
  id: string;
  fileName: string;
  fileSize: string;
  children?: Item[]; // optional — some files may have nested docs
};

export type FolderItem = {
  id: string;
  folderName: string;
  image: string;
  items: number;
  children: Item[]; // folders always have children array
};

export type Item = FolderItem | FileItem;

export type ServiceData = {
  id: number;
  title: string;
  description: string;
  image: string;
  folders: FolderItem[]; // top-level folders
};

export type BreadcrumbData = {
  id: string;
  label: string;
};
