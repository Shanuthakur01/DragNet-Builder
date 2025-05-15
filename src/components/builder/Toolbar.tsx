
"use client";
import { useBuilder } from '@/contexts/BuilderContext';
import { Button } from '@/components/ui/button';
import { Laptop, Tablet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Toolbar() {
  const { previewMode, setPreviewMode } = useBuilder();

  return (
    <div className="p-2 md:p-4 bg-card border-b border-border sticky top-0 z-10 flex justify-center items-center space-x-2 rounded-t-lg shadow">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setPreviewMode('desktop')}
            aria-pressed={previewMode === 'desktop'}
            className={cn(previewMode === 'desktop' && "bg-primary text-primary-foreground")}
          >
            <Laptop className="h-5 w-5" />
            <span className="sr-only">Desktop Preview</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Desktop</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={previewMode === 'tablet' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setPreviewMode('tablet')}
            aria-pressed={previewMode === 'tablet'}
            className={cn(previewMode === 'tablet' && "bg-primary text-primary-foreground")}
          >
            <Tablet className="h-5 w-5" />
            <span className="sr-only">Tablet Preview</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Tablet</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setPreviewMode('mobile')}
            aria-pressed={previewMode === 'mobile'}
            className={cn(previewMode === 'mobile' && "bg-primary text-primary-foreground")}
          >
            <Smartphone className="h-5 w-5" />
            <span className="sr-only">Mobile Preview</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Mobile</TooltipContent>
      </Tooltip>
    </div>
  );
}
