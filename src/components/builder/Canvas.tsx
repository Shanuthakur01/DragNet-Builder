
"use client";
import { useBuilder } from '@/contexts/BuilderContext';
import type { AvailableElement, CanvasElement, PreviewMode } from '@/types/builder';
import { CanvasItem } from './CanvasItem';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DRAGGABLE_TYPE_PALETTE_ITEM } from '@/lib/constants';

const getPreviewSize = (mode: PreviewMode): { width: string; height: string } => {
  switch (mode) {
    case 'mobile':
      return { width: '375px', height: '667px' };
    case 'tablet':
      return { width: '768px', height: '1024px' };
    case 'desktop':
    default:
      return { width: '100%', height: '100%' };
  }
};

export function Canvas() {
  const { canvasElements, addElementToCanvas, selectElement, selectedElementId, previewMode } = useBuilder();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData(DRAGGABLE_TYPE_PALETTE_ITEM);
    if (!data) return;

    try {
      const droppedElement = JSON.parse(data) as AvailableElement;
      const newElement: Omit<CanvasElement, 'id'> = {
        type: droppedElement.type,
        props: droppedElement.defaultProps,
      };
      addElementToCanvas(newElement);
    } catch (error) {
      console.error("Failed to parse dropped element data:", error);
    }
  };

  const previewSize = getPreviewSize(previewMode);

  return (
    <ScrollArea className="h-full bg-secondary/50 rounded-lg shadow-inner">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "mx-auto bg-background shadow-lg transition-all duration-300 ease-in-out overflow-y-auto",
          "p-4 md:p-8 border border-dashed border-muted-foreground/50 min-h-[400px]"
        )}
        style={{
          width: previewSize.width,
          height: previewSize.height,
          maxHeight: 'calc(100vh - 200px)', // Adjust as needed
          ...(previewMode !== 'desktop' && { margin: '2rem auto' })
        }}
        aria-label={`Canvas preview mode: ${previewMode}, width: ${previewSize.width}, height: ${previewSize.height}`}
      >
        {canvasElements.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Drag and drop elements here</p>
          </div>
        )}
        {canvasElements.map((element) => (
          <CanvasItem
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            onClick={() => selectElement(element.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
