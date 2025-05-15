import type { AvailableElement, ElementType } from '@/types/builder';
import { CaseSensitive, Image as ImageIcon, RectangleHorizontal, PencilLine } from 'lucide-react';

export const AVAILABLE_ELEMENTS: AvailableElement[] = [
  {
    id: 'text',
    type: 'text' as ElementType,
    name: 'Text',
    icon: CaseSensitive,
    defaultProps: {
      content: 'Editable Text',
      fontSize: '16px',
      color: '#000000',
    },
  },
  {
    id: 'image',
    type: 'image' as ElementType,
    name: 'Image',
    icon: ImageIcon,
    defaultProps: {
      src: 'https://placehold.co/300x200.png',
      alt: 'Placeholder Image',
    },
  },
  {
    id: 'button',
    type: 'button' as ElementType,
    name: 'Button',
    icon: RectangleHorizontal,
    defaultProps: {
      text: 'Click Me',
      variant: 'default',
    },
  },
];

export const DEFAULT_TEMPLATE_STRUCTURE = `
A common website layout with a header, a main content area, and a footer.
- Header: Typically contains navigation and logo.
- Main Content: The primary section for page content.
- Footer: Contains copyright information, links, etc.
Consider placing elements logically within these sections.
`;

export const DESIGN_PRINCIPLES_SUGGESTION = `
Focus on visual hierarchy, balance, and user flow. Ensure calls to action are prominent.
Use consistent spacing and alignment.
`;

export const DRAGGABLE_TYPE_PALETTE_ITEM = 'PALETTE_ITEM';
