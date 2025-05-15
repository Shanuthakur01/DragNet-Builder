
"use client";
import { AVAILABLE_ELEMENTS } from '@/lib/constants';
import { ElementPaletteItem } from './ElementPaletteItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function ElementPalette() {
  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Elements</h2>
      <ScrollArea className="flex-grow">
        {AVAILABLE_ELEMENTS.map((element) => (
          <ElementPaletteItem key={element.id} element={element} />
        ))}
      </ScrollArea>
    </div>
  );
}
