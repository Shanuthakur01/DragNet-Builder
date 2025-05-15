
"use client";
import type { BuilderContextType, CanvasElement, ElementProps, PreviewMode } from '@/types/builder';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is installed or use Math.random for prototype

// Helper to generate unique IDs if uuid is not available (for simplicity in prototype)
const generateId = () => Math.random().toString(36).substr(2, 9);


const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const addElementToCanvas = useCallback((element: Omit<CanvasElement, 'id'>) => {
    setCanvasElements((prevElements) => [...prevElements, { ...element, id: generateId() }]);
  }, []);

  const updateElementProps = useCallback((id: string, newProps: Partial<ElementProps>) => {
    setCanvasElements((prevElements) =>
      prevElements.map((el) =>
        el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el
      )
    );
  }, []);

  const selectElement = useCallback((id: string | null) => {
    setSelectedElementId(id);
  }, []);

  const deleteElement = useCallback((id: string) => {
    setCanvasElements((prevElements) => prevElements.filter((el) => el.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  }, [selectedElementId]);

  const contextValue: BuilderContextType = {
    canvasElements,
    selectedElementId,
    previewMode,
    addElementToCanvas,
    updateElementProps,
    selectElement,
    deleteElement,
    setPreviewMode,
    setCanvasElements,
  };

  return <BuilderContext.Provider value={contextValue}>{children}</BuilderContext.Provider>;
};

export const useBuilder = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
