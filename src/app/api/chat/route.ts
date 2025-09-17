import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// 初始化 Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

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

    // 使用 Gemini 2.0 Flash 模型
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString()
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