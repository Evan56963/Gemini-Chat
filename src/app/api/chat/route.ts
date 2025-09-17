import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { AVAILABLE_MODELS, DEFAULT_MODEL } from '@/models/modelConfig';

// 初始化 Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, modelId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '請提供訊息內容' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: '缺少 Google API 金鑰' },
        { status: 500 }
      );
    }

    // 驗證模型 ID 並取得模型配置
    const selectedModelConfig = modelId 
      ? AVAILABLE_MODELS.find(m => m.id === modelId) || DEFAULT_MODEL
      : DEFAULT_MODEL;

    // 使用選定的模型
    const model = genAI.getGenerativeModel({ 
      model: selectedModelConfig.id,
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: selectedModelConfig.maxTokens || 2048,
      },
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString(),
      model: selectedModelConfig.name
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