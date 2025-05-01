
import { Header } from "@/components/Header";
import { RallyBoard } from "@/components/RallyBoard";

const RallyPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold mb-6">Rally Integration</h1>
        <p className="text-muted-foreground mb-8">
          Manage your user stories in a Rally-style board with drag and drop functionality.
        </p>
        
        <RallyBoard />
      </main>
    </div>
  );
};

export default RallyPage;
