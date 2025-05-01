
import React, { createContext, useContext, useState } from "react";
import { AIModelType, SolutionDocument, UserStory } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AppContextType {
  documentContent: SolutionDocument | null;
  setDocumentContent: (document: SolutionDocument | null) => void;
  selectedModel: AIModelType;
  setSelectedModel: (model: AIModelType) => void;
  userStories: UserStory[];
  setUserStories: (stories: UserStory[]) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  processDocument: () => Promise<void>;
  refineStory: (id: string, refinement: string) => Promise<void>;
  deleteStory: (id: string) => void;
  moveToRally: (stories: UserStory[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [documentContent, setDocumentContent] = useState<SolutionDocument | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModelType>("gemini");
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const processDocument = async () => {
    if (!documentContent) {
      toast({
        title: "Error",
        description: "Please upload a document or enter text first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      // In a real implementation, this would call the backend API
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock data for demo
      const mockStories: UserStory[] = [
        {
          id: "US1",
          name: "User Authentication",
          description: "As a user, I want to be able to login with my credentials so that I can access the system securely.",
          planEstimate: 5,
          notes: "Should include password reset functionality.",
          status: "backlog"
        },
        {
          id: "US2",
          name: "Document Upload",
          description: "As a product owner, I want to be able to upload solution documents in PDF or DOCX format so that the system can process them.",
          planEstimate: 3,
          notes: "Support for PDF and DOCX is required.",
          status: "backlog"
        },
        {
          id: "US3",
          name: "AI Model Selection",
          description: "As a product owner, I want to select which AI model to use for user story generation.",
          planEstimate: 2,
          notes: "Initial support for Gemini, ChatGPT, and Co-pilot.",
          status: "backlog"
        }
      ];
      
      setUserStories(mockStories);
      
      toast({
        title: "Success",
        description: "User stories generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process document. Please try again.",
        variant: "destructive",
      });
      console.error("Error processing document:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const refineStory = async (id: string, refinement: string) => {
    try {
      setIsGenerating(true);
      // In a real implementation, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the story with the refinement
      setUserStories(prev => 
        prev.map(story => 
          story.id === id 
            ? { ...story, description: story.description + " " + refinement } 
            : story
        )
      );
      
      toast({
        title: "Success",
        description: "User story refined successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refine user story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteStory = (id: string) => {
    setUserStories(prev => prev.filter(story => story.id !== id));
    toast({
      title: "Success",
      description: "User story deleted successfully!",
    });
  };

  const moveToRally = (stories: UserStory[]) => {
    toast({
      title: "Success",
      description: `${stories.length} stories moved to Rally board!`,
    });
  };

  return (
    <AppContext.Provider
      value={{
        documentContent,
        setDocumentContent,
        selectedModel,
        setSelectedModel,
        userStories,
        setUserStories,
        isGenerating,
        setIsGenerating,
        processDocument,
        refineStory,
        deleteStory,
        moveToRally,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
