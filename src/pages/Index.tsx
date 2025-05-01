
import { Header } from "@/components/Header";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ModelSelector } from "@/components/ModelSelector";
import { GenerateButton } from "@/components/GenerateButton";
import { UserStoryList } from "@/components/UserStoryList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold mb-6">AI Product Owner</h1>
        <p className="text-muted-foreground mb-8">
          Upload a solution document and let AI generate user stories for your project.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DocumentUpload />
          <ModelSelector />
        </div>
        
        <div className="mt-6">
          <GenerateButton />
        </div>
        
        <UserStoryList />
      </main>
    </div>
  );
};

export default Index;
