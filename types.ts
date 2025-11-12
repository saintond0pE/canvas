export interface ImageFile {
  name: string;
  type: string;
  size: number;
  base64: string;
}

export interface Project {
  id: string;
  name: string;
  originalImage: ImageFile;
  history: string[];
  createdAt: number; // Storing as a timestamp for easy serialization
  updatedAt: number;
}
