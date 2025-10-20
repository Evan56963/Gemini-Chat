export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  model?: string;
  files?: UploadedFile[];
}

export interface UploadedFile {
  name: string;
  type: string;
  size: number;
}

export interface ApiResponse {
  response: string;
  timestamp: string;
  model?: string;
  fileCount?: number;
}

export interface ApiError {
  error: string;
}