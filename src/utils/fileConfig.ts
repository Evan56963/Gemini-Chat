import { 
  DocumentIcon,
  PhotoIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';

export interface FileTypeConfig {
  icon: typeof DocumentIcon;
  label: string;
  mimeType: string;
}

export const SUPPORTED_FILE_TYPES: Record<string, FileTypeConfig> = {
  'image/jpeg': { icon: PhotoIcon, label: '圖片', mimeType: 'image/jpeg' },
  'image/png': { icon: PhotoIcon, label: '圖片', mimeType: 'image/png' },
  'image/gif': { icon: PhotoIcon, label: '圖片', mimeType: 'image/gif' },
  'image/webp': { icon: PhotoIcon, label: '圖片', mimeType: 'image/webp' },
  'text/plain': { icon: DocumentIcon, label: '文字檔案', mimeType: 'text/plain' },
  'application/pdf': { icon: DocumentIcon, label: 'PDF', mimeType: 'application/pdf' },
  'text/csv': { icon: TableCellsIcon, label: 'CSV', mimeType: 'text/csv' },
  'application/vnd.ms-excel': { icon: TableCellsIcon, label: 'CSV', mimeType: 'text/csv' }
};

export const SUPPORTED_EXTENSIONS = ['.csv', '.txt'];

// 文字檔案類型檢查
export function isTextFile(file: File): boolean {
  return file.type === 'text/csv' || 
         file.type === 'application/vnd.ms-excel' || 
         file.type === 'text/plain' ||
         file.name.toLowerCase().endsWith('.csv') ||
         file.name.toLowerCase().endsWith('.txt');
}

export function isFileSupported(file: File): boolean {
  const isValidMimeType = SUPPORTED_FILE_TYPES[file.type];
  const isValidExtension = SUPPORTED_EXTENSIONS.some(ext => 
    file.name.toLowerCase().endsWith(ext)
  );
  
  return !!(isValidMimeType || isValidExtension);
}

export function getFileIcon(file: File) {
  const fileType = SUPPORTED_FILE_TYPES[file.type];
  if (fileType) return fileType.icon;
  
  // 根據副檔名判斷
  if (file.name.toLowerCase().endsWith('.csv')) {
    return TableCellsIcon;
  }
  
  return DocumentIcon;
}