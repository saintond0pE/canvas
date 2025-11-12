import React, { useCallback, useState } from 'react';
import { ImageFile } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileUpload: (file: ImageFile) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileUpload({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onFileUpload]);

  return (
    <div
      className={`group relative p-8 transition-all duration-300 bg-white/40 backdrop-blur-xl rounded-3xl border shadow-2xl hover:shadow-purple-300/40
        ${isDragging ? 'border-purple-300 scale-105 shadow-purple-500/20' : 'border-white/30'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center text-center cursor-pointer">
        <UploadIcon className="w-16 h-16 mb-4 text-gray-700 transition-transform duration-300 group-hover:-translate-y-2" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Image</h3>
        <p className="text-gray-600">Drag & drop or click to select a file</p>
        <p className="text-xs text-gray-500 mt-2">Recommended aspect ratio: 16:9 (1280x720px)</p>
      </label>
    </div>
  );
};

export default FileUpload;
