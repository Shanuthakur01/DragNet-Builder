import type { LucideIcon } from 'lucide-react';

export type ElementType = 'text' | 'image' | 'button';

export type PreviewMode = 'desktop' | 'tablet' | 'mobile';

export interface BaseElementProps {
  [key: string]: any;
}

export interface TextElementProps extends BaseElementProps {
  content: string;
  fontSize: string;
  color: string;
}

export interface ImageElementProps extends BaseElementProps {
  src: string;
  alt: string;
}

export interface ButtonElementProps extends BaseElementProps {
  text: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  actionUrl?: string;
}

export type ElementProps = TextElementProps | ImageElementProps | ButtonElementProps;

export interface AvailableElement {
  id: string;
  type: ElementType;
  name: string;
  icon: LucideIcon;
  defaultProps: ElementProps;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  props: ElementProps;
  // For simplicity, we won't manage x, y, width, height in this prototype.
  // Elements will be stacked or ordered.
}

export interface BuilderContextType {
  canvasElements: CanvasElement[];
  selectedElementId: string | null;
  previewMode: PreviewMode;
  addElementToCanvas: (element: Omit<CanvasElement, 'id'>) => void;
  updateElementProps: (id: string, props: Partial<ElementProps>) => void;
  selectElement: (id: string | null) => void;
  deleteElement: (id: string) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setCanvasElements: (elements: CanvasElement[]) => void; // For AI suggestions or templates
}
