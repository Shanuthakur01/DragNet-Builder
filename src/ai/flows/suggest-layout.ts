'use server';

/**
 * @fileOverview AI-powered layout suggestion flow.
 *
 * - suggestLayout - A function that suggests optimal element placements based on design principles.
 * - SuggestLayoutInput - The input type for the suggestLayout function.
 * - SuggestLayoutOutput - The return type for the suggestLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLayoutInputSchema = z.object({
  elementTypes: z
    .array(z.string())
    .describe('A list of element types to be placed on the canvas.'),
  templateStructure: z
    .string()
    .describe('A description of the predefined template structure.'),
  designPrinciples: z
    .string()
    .optional()
    .describe('Optional design principles to consider.'),
});
export type SuggestLayoutInput = z.infer<typeof SuggestLayoutInputSchema>;

const SuggestLayoutOutputSchema = z.object({
  suggestedLayout: z
    .string()
    .describe(
      'A JSON string representing the suggested layout with element placements.'
    ),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggested layout.'),
});
export type SuggestLayoutOutput = z.infer<typeof SuggestLayoutOutputSchema>;

export async function suggestLayout(input: SuggestLayoutInput): Promise<SuggestLayoutOutput> {
  return suggestLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLayoutPrompt',
  input: {schema: SuggestLayoutInputSchema},
  output: {schema: SuggestLayoutOutputSchema},
  prompt: `You are an AI layout design assistant. Given the following information, suggest an optimal layout for the elements within the template structure.

Element Types: {{elementTypes}}
Template Structure: {{templateStructure}}
{% if designPrinciples %}Design Principles: {{designPrinciples}}{% endif %}

Consider common design principles such as balance, contrast, and visual hierarchy.

Provide the layout suggestion as a JSON string and include a reasoning for your choices.

Ensure the JSON is parseable.

Here is the expected output format:
{
  "suggestedLayout": "{\"element1\": {\"position\": \"top-left\", \"size\": \"small\"}, \"element2\": {\"position\": \"bottom-right\", \"size\": \"large\"}}",
  "reasoning": "Explanation of why the layout was chosen."
}`,
});

const suggestLayoutFlow = ai.defineFlow(
  {
    name: 'suggestLayoutFlow',
    inputSchema: SuggestLayoutInputSchema,
    outputSchema: SuggestLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
