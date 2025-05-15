
"use client";
import { useBuilder } from '@/contexts/BuilderContext';
import type { TextElementProps, ImageElementProps, ButtonElementProps } from '@/types/builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertiesPanel() {
  const { selectedElementId, canvasElements, updateElementProps, deleteElement, selectElement } = useBuilder();

  if (!selectedElementId) {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg shadow-inner">
        <p>Select an element to edit its properties.</p>
      </div>
    );
  }

  const selectedElement = canvasElements.find((el) => el.id === selectedElementId);

  if (!selectedElement) {
    return <div className="p-4 text-destructive">Error: Element not found.</div>;
  }

  const handlePropChange = (propName: string, value: any) => {
    updateElementProps(selectedElementId, { [propName]: value });
  };
  
  const handleDelete = () => {
    deleteElement(selectedElementId);
    selectElement(null);
  }

  const renderPropertiesForm = () => {
    switch (selectedElement.type) {
      case 'text':
        const textProps = selectedElement.props as TextElementProps;
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="textContent">Content</Label>
              <Input
                id="textContent"
                value={textProps.content}
                onChange={(e) => handlePropChange('content', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="fontSize">Font Size (e.g., 16px)</Label>
              <Input
                id="fontSize"
                value={textProps.fontSize}
                onChange={(e) => handlePropChange('fontSize', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="color">Color (e.g., #FF0000)</Label>
              <Input
                id="color"
                type="color"
                value={textProps.color}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="h-10"
              />
            </div>
          </>
        );
      case 'image':
        const imgProps = selectedElement.props as ImageElementProps;
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="imageSrc">Image URL</Label>
              <Input
                id="imageSrc"
                value={imgProps.src}
                onChange={(e) => handlePropChange('src', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="imageAlt">Alt Text</Label>
              <Input
                id="imageAlt"
                value={imgProps.alt}
                onChange={(e) => handlePropChange('alt', e.target.value)}
              />
            </div>
          </>
        );
      case 'button':
        const btnProps = selectedElement.props as ButtonElementProps;
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={btnProps.text}
                onChange={(e) => handlePropChange('text', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="buttonVariant">Variant</Label>
              <Select
                value={btnProps.variant}
                onValueChange={(value) => handlePropChange('variant', value)}
              >
                <SelectTrigger id="buttonVariant">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2 mb-4">
              <Label htmlFor="actionUrl">Action URL (optional)</Label>
              <Input
                id="actionUrl"
                value={btnProps.actionUrl || ''}
                onChange={(e) => handlePropChange('actionUrl', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </>
        );
      default:
        return <p>No properties to edit for this element.</p>;
    }
  };

  return (
    <div className="p-4 h-full flex flex-col bg-card shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">Properties</h2>
        <Button variant="ghost" size="icon" onClick={handleDelete} aria-label="Delete element">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <Separator className="mb-4" />
      <ScrollArea className="flex-grow">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {renderPropertiesForm()}
        </form>
      </ScrollArea>
    </div>
  );
}
