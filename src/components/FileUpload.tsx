import React, { useRef } from 'react';
import { 
  PaperClipIcon, 
  XMarkIcon,
  DocumentIcon,
  PhotoIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import { UploadedFile } from '@/types/chat';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}

const SUPPORTED_FILE_TYPES = {
  'image/jpeg': { icon: PhotoIcon, label: '圖片' },
  'image/png': { icon: PhotoIcon, label: '圖片' },
  'image/gif': { icon: PhotoIcon, label: '圖片' },
  'image/webp': { icon: PhotoIcon, label: '圖片' },
  'text/plain': { icon: DocumentIcon, label: '文字檔案' },
  'application/pdf': { icon: DocumentIcon, label: 'PDF' },
  'text/csv': { icon: TableCellsIcon, label: 'CSV' },
  'application/vnd.ms-excel': { icon: TableCellsIcon, label: 'CSV' }
};

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      // 檢查檔案類型或副檔名
      const isValidMimeType = SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES];
      const isValidExtension = file.name.toLowerCase().endsWith('.csv') || 
                              file.name.toLowerCase().endsWith('.txt');
      
      return isValidMimeType || isValidExtension;
    });
    
    if (validFiles.length !== selectedFiles.length) {
      alert('部分檔案類型不支援，已自動過濾');
    }
    
    onFilesChange([...files, ...validFiles]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    const fileType = SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES];
    if (fileType) return fileType.icon;
    
    // 根據副檔名判斷
    if (file.name.toLowerCase().endsWith('.csv')) {
      return TableCellsIcon;
    }
    
    return DocumentIcon;
  };

  return (
    <div className="space-y-2">
      {/* 檔案選擇按鈕 */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="上傳檔案"
        >
          <PaperClipIcon className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.webp,.txt,.pdf,.csv"
          onChange={handleFileSelect}
          className="hidden"
        />
        {files.length > 0 && (
          <span className="text-xs text-gray-500">
            已選擇 {files.length} 個檔案
          </span>
        )}
      </div>

      {/* 已選擇的檔案列表 */}
      {files.length > 0 && (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {files.map((file, index) => {
            const IconComponent = getFileIcon(file);
            
            return (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <IconComponent className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-gray-500 flex-shrink-0">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="移除檔案"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
