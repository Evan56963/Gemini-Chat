export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ApiResponse {
  response: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
}