import { useState, useEffect } from 'react';
import { ModelConfig, DEFAULT_MODEL, AVAILABLE_MODELS } from '../utils/modelConfig';

const MODEL_STORAGE_KEY = 'selected-model';

export const useModelSelection = () => {
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(DEFAULT_MODEL);

  useEffect(() => {
    const savedModelId = localStorage.getItem(MODEL_STORAGE_KEY);
    if (savedModelId) {
      const savedModel = AVAILABLE_MODELS.find(m => m.id === savedModelId);
      if (savedModel) {
        setSelectedModel(savedModel);
      }
    }
  }, []);

  const changeModel = (model: ModelConfig) => {
    setSelectedModel(model);
    localStorage.setItem(MODEL_STORAGE_KEY, model.id);
  };

  return {
    selectedModel,
    changeModel,
    availableModels: AVAILABLE_MODELS
  };
};
