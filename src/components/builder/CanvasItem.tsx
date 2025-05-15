
"use client";
import type { CanvasElement, TextElementProps, ImageElementProps, ButtonElementProps } from '@/types/builder';
import { Button as ShadButton } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CanvasItemProps {
  element: CanvasElement;
  isSelected: boolean;
  onClick: () => void;
}

export function CanvasItem({ element, isSelected, onClick }: CanvasItemProps) {
  const baseClasses = "p-2 border transition-all duration-150 cursor-pointer";
  const selectedClasses = isSelected ? "ring-2 ring-primary shadow-lg" : "border-transparent hover:border-primary/50";

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        const textProps = element.props as TextElementProps;
        return (
          <p style={{ fontSize: textProps.fontSize, color: textProps.color }} data-ai-hint="text content">
            {textProps.content}
          </p>
        );
      case 'image':
        const imgProps = element.props as ImageElementProps;
        return (
          <Image
            src={imgProps.src || 'https://placehold.co/300x200.png'}
            alt={imgProps.alt}
            width={300} // Default width, could be configurable
            height={200} // Default height, could be configurable
            className="object-contain"
            data-ai-hint="placeholder image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/300x200.png';
            }}
          />
        );
      case 'button':
        const btnProps = element.props as ButtonElementProps;
        return (
          <ShadButton variant={btnProps.variant} size="default" data-ai-hint="call-to-action button">
            {btnProps.text}
          </ShadButton>
        );
      default:
        return <div className="text-destructive">Unknown element type</div>;
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(baseClasses, selectedClasses, "bg-card rounded-md my-2")}
      aria-selected={isSelected}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {renderElement()}
    </div>
  );
}
