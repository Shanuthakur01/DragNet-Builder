
import { ElementPalette } from '@/components/builder/ElementPalette';
import { Canvas } from '@/components/builder/Canvas';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { Toolbar } from '@/components/builder/Toolbar';
import { AiSuggestionsPanel } from '@/components/builder/AiSuggestionsPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function BuilderPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Left Sidebar: Element Palette & AI Suggestions */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col shadow-md">
        <ElementPalette />
        <Separator />
        <div className="p-4">
         <AiSuggestionsPanel />
        </div>
      </aside>

      {/* Main Content Area: Toolbar & Canvas */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Toolbar />
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Canvas />
        </div>
      </main>

      {/* Right Sidebar: Properties Panel */}
      <aside className="w-80 flex-shrink-0 border-l border-border bg-card flex flex-col shadow-md">
        <PropertiesPanel />
      </aside>
    </div>
  );
}
