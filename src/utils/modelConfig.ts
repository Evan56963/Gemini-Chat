export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  maxTokens?: number;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    description: '新一代功能、速度和即時串流。'
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    description: '更強大的思考和推理能力、多模態理解能力、進階程式設計能力等'
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: '適應性思維、成本效益'
  },

];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0];

// 模型查找函數
export function findModelById(modelId: string): ModelConfig | null {
  return AVAILABLE_MODELS.find(m => m.id === modelId) || null;
}

// 找不到時返回預設模型
export function getModelById(modelId: string): ModelConfig {
  return findModelById(modelId) || DEFAULT_MODEL;
}
