# Gemini 2.0 Flash 聊天應用

這是一個使用 React、Next.js、TypeScript 和 Tailwind CSS 建立的聊天應用程式，可以與 Google Gemini 2.0 Flash AI 模型進行互動。

## 功能特色

- 🤖 與 Google Gemini 2.0 Flash 模型即時對話
- 💬 美觀的聊天介面設計
- 📱 響應式設計，支援桌面和行動裝置
- ⚡ 使用 Next.js 14 App Router
- 🎨 Tailwind CSS 4.x 樣式設計
- 🔤 TypeScript 完整類型支援
- 🎯 Heroicons 圖示庫

## 技術架構

- **前端框架**: React 18 + Next.js 14
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4.x
- **圖示**: Heroicons
- **AI 模型**: Google Gemini 2.0 Flash(可選)
- **API**: Google Generative AI SDK

## 快速開始

### 前置需求

1. Node.js 18.0 或更高版本
2. npm 或 yarn 套件管理器
3. Google AI API 金鑰

### 安裝步驟

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **設定環境變數**
   
   在 `.env.local` 檔案中設定您的 Google API 金鑰：
   ```
   GOOGLE_API_KEY=your_actual_google_api_key_here
   ```

3. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

4. **開啟瀏覽器**
   前往 [http://localhost:3000](http://localhost:3000) 開始使用

### 取得 Google API 金鑰

1. 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 建立新的 API 金鑰
3. 將金鑰複製到 `.env.local` 檔案中

## 環境變數

在使用應用程式之前，請在 `.env.local` 檔案中設定您的 Google API 金鑰：

```
GOOGLE_API_KEY=your_actual_google_api_key_here
```

## 開發命令

```bash
# 啟動開發伺服器
npm run dev

# 建立生產版本
npm run build

# 啟動生產伺服器
npm start
```

## 疑難排解

### 常見問題

1. **API 金鑰錯誤**
   - 確認 `.env.local` 檔案存在且包含正確的 API 金鑰
   - 檢查 API 金鑰是否有效且未過期

2. **模組找不到錯誤**
   - 執行 `npm install` 重新安裝依賴
