
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { Loader2, Sparkles } from "lucide-react";

export function GenerateButton() {
  const { documentContent, selectedModel, isGenerating, processDocument } = useAppContext();

  const isReady = !!documentContent;

  return (
    <Button
      className="w-full font-semibold py-6 text-base animate-fade-in"
      onClick={() => processDocument()}
      disabled={!isReady || isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate User Stories with {selectedModel === "chatgpt" ? "ChatGPT" : selectedModel === "copilot" ? "Co-pilot" : "Gemini"}
        </>
      )}
    </Button>
  );
}
