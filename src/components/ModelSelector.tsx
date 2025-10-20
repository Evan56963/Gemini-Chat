import React from 'react';
import { ModelConfig } from '../utils/modelConfig';

interface ModelSelectorProps {
  selectedModel: ModelConfig;
  onModelChange: (model: ModelConfig) => void;
  availableModels: ModelConfig[];
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  availableModels
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="model-select" className="text-sm text-gray-600 whitespace-nowrap">
        模型：
      </label>
      <select
        id="model-select"
        value={selectedModel.id}
        onChange={(e) => {
          const model = availableModels.find(m => m.id === e.target.value);
          // 只有找到有效模型才執行變更
          if (model) {
            onModelChange(model);
          }
        }}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        title={selectedModel.description}
      >
        {availableModels.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};
