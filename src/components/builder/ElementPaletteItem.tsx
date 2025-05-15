
"use client";
import type { AvailableElement } from '@/types/builder';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DRAGGABLE_TYPE_PALETTE_ITEM } from '@/lib/constants';

interface ElementPaletteItemProps {
  element: AvailableElement;
}

export function ElementPaletteItem({ element }: ElementPaletteItemProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(DRAGGABLE_TYPE_PALETTE_ITEM, JSON.stringify(element));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "p-2 cursor-grab hover:shadow-md transition-shadow duration-150 mb-2 bg-card text-card-foreground hover:bg-accent/10",
        "flex items-center gap-2"
      )}
      aria-label={`Drag ${element.name} element`}
    >
      <element.icon className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium">{element.name}</span>
    </Card>
  );
}
