import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { AVAILABLE_MODELS, DEFAULT_MODEL } from '@/models/modelConfig';

// 初始化 Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// 支援的檔案類型
const SUPPORTED_FILE_TYPES = {
  'image/jpeg': 'image/jpeg',
  'image/png': 'image/png',
  'image/gif': 'image/gif',
  'image/webp': 'image/webp',
  'text/plain': 'text/plain',
  'application/pdf': 'application/pdf',
  'text/csv': 'text/csv',
  'application/vnd.ms-excel': 'text/csv'
};

async function processFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  
  // 對於 CSV 和文字檔案，直接轉換為文字格式
  if (file.type === 'text/csv' || 
      file.type === 'application/vnd.ms-excel' || 
      file.type === 'text/plain' ||
      file.name.toLowerCase().endsWith('.csv') ||
      file.name.toLowerCase().endsWith('.txt')) {
    
    const text = new TextDecoder('utf-8').decode(arrayBuffer);
    
    return {
      text: text
    };
  }
  
  // 其他檔案類型使用 base64 編碼
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  
  return {
    inlineData: {
      data: base64,
      mimeType: file.type
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const message = formData.get('message') as string;
    const modelId = formData.get('modelId') as string;
    const files = formData.getAll('files') as File[];

    if (!message && files.length === 0) {
      return NextResponse.json(
        { error: '請提供訊息內容或上傳檔案' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: '缺少 Google API 金鑰' },
        { status: 500 }
      );
    }

    // 驗證檔案類型
    for (const file of files) {
      const isSupported = SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES] ||
                         file.name.toLowerCase().endsWith('.csv') ||
                         file.name.toLowerCase().endsWith('.txt');
      
      if (!isSupported) {
        return NextResponse.json(
          { error: `不支援的檔案類型: ${file.type}` },
          { status: 400 }
        );
      }
    }

    // 驗證模型 ID 並取得模型配置
    const selectedModelConfig = modelId 
      ? AVAILABLE_MODELS.find(m => m.id === modelId) || DEFAULT_MODEL
      : DEFAULT_MODEL;

    // 使用選定的模型
    const model = genAI.getGenerativeModel({ 
      model: selectedModelConfig.id,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: selectedModelConfig.maxTokens || 8192,
      },
    });

    // 準備內容
    const parts = [];
    
    // 如果有檔案但沒有訊息，添加預設提示
    if (files.length > 0 && !message.trim()) {
      parts.push({ text: "請分析這些上傳的檔案內容。" });
    } else if (message.trim()) {
      parts.push({ text: message });
    }

    // 處理上傳的檔案
    for (const file of files) {
      try {
        const fileData = await processFile(file);
        parts.push(fileData);
      } catch (fileError) {
        console.error(`處理檔案 ${file.name} 時發生錯誤:`, fileError);
        return NextResponse.json(
          { error: `無法處理檔案 ${file.name}` },
          { status: 400 }
        );
      }
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'AI 模型沒有產生回覆，請重試或調整您的問題' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString(),
      model: selectedModelConfig.name,
      fileCount: files.length
    });

  } catch (error) {
    console.error('Gemini API 錯誤:', error);
    
    return NextResponse.json(
      { error: '無法處理您的請求，請稍後再試' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: '請使用 POST 方法傳送訊息給 Gemini' },
    { status: 405 }
  );
}