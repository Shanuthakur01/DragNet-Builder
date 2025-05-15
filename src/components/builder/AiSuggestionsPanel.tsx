
"use client";
import { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { suggestLayout, type SuggestLayoutInput } from '@/ai/flows/suggest-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DEFAULT_TEMPLATE_STRUCTURE, DESIGN_PRINCIPLES_SUGGESTION } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

export function AiSuggestionsPanel() {
  const { canvasElements } = useBuilder();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [templateStructure, setTemplateStructure] = useState(DEFAULT_TEMPLATE_STRUCTURE);
  const [designPrinciples, setDesignPrinciples] = useState(DESIGN_PRINCIPLES_SUGGESTION);
  const [isOpen, setIsOpen] = useState(false);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    setReasoning(null);

    const elementTypes = canvasElements.map(el => el.type);
    if (elementTypes.length === 0) {
        elementTypes.push("text", "image", "button"); // Default if canvas is empty
    }

    const input: SuggestLayoutInput = {
      elementTypes,
      templateStructure,
      designPrinciples,
    };

    try {
      const result = await suggestLayout(input);
      if (result.suggestedLayout && result.reasoning) {
        setSuggestion(result.suggestedLayout);
        setReasoning(result.reasoning);
        toast({
          title: "AI Suggestion Ready",
          description: "Layout suggestions have been generated.",
        });
      } else {
        setError("Received an empty or invalid suggestion from the AI.");
         toast({
          title: "AI Suggestion Error",
          description: "Received an empty or invalid suggestion.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("AI Suggestion Error:", err);
      setError("Failed to get suggestions from the AI. Please try again.");
      toast({
        title: "AI Suggestion Failed",
        description: "Could not retrieve suggestions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Wand2 className="mr-2 h-4 w-4" />
          AI Layout Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>AI Layout Suggestions</DialogTitle>
          <DialogDescription>
            Get AI-powered suggestions for arranging your elements.
            Current elements: {canvasElements.map(e => e.type).join(', ') || 'None (using defaults)'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateStructure">Template Structure</Label>
              <Textarea
                id="templateStructure"
                value={templateStructure}
                onChange={(e) => setTemplateStructure(e.target.value)}
                rows={5}
                placeholder="Describe the template structure (e.g., header, sidebar, main content, footer)..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designPrinciples">Design Principles (Optional)</Label>
              <Textarea
                id="designPrinciples"
                value={designPrinciples}
                onChange={(e) => setDesignPrinciples(e.target.value)}
                rows={3}
                placeholder="Enter design principles (e.g., balance, contrast, visual hierarchy)..."
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {suggestion && reasoning && (
              <div className="space-y-4 mt-4">
                <Alert>
                  <Wand2 className="h-4 w-4" />
                  <AlertTitle>Suggested Layout</AlertTitle>
                  <AlertDescription>
                    <pre className="whitespace-pre-wrap break-all text-xs bg-muted p-2 rounded-md">
                      {JSON.stringify(JSON.parse(suggestion), null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTitle>Reasoning</AlertTitle>
                  <AlertDescription className="text-sm">
                    {reasoning}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={handleGetSuggestions} disabled={isLoading} className="min-w-[150px]">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Get Suggestions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
