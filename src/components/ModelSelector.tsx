import React from 'react';
import { AVAILABLE_MODELS, ModelConfig } from '../models/modelConfig';

interface ModelSelectorProps {
  selectedModel: ModelConfig;
  onModelChange: (model: ModelConfig) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange
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
          const model = AVAILABLE_MODELS.find(m => m.id === e.target.value);
          if (model) onModelChange(model);
        }}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        title={selectedModel.description}
      >
        {AVAILABLE_MODELS.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};
