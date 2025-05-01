
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIModelType } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";

interface ModelOption {
  id: AIModelType;
  name: string;
  description: string;
}

const models: ModelOption[] = [
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's free AI model with strong capabilities.",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's powerful language model.",
  },
];

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useAppContext();

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Select AI Model</CardTitle>
        <CardDescription>Choose which AI model to use for generating user stories</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedModel}
          onValueChange={(value) => setSelectedModel(value as AIModelType)}
          className="space-y-4"
        >
          {models.map((model) => (
            <div
              key={model.id}
              className={`flex items-center space-x-2 rounded-md border p-4 transition-all ${
                selectedModel === model.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-muted-foreground/20"
              }`}
            >
              <RadioGroupItem value={model.id} id={model.id} />
              <div className="flex-1">
                <Label
                  htmlFor={model.id}
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {model.name}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
