
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RallyColumn, UserStory } from "@/types";
import { useAppContext } from "@/context/AppContext";

export function RallyBoard() {
  const { userStories } = useAppContext();
  const [columns, setColumns] = useState<RallyColumn[]>([
    { id: "backlog", title: "Backlog", stories: [] },
    { id: "defined", title: "Defined", stories: [] },
    { id: "inProgress", title: "In Progress", stories: [] },
    { id: "completed", title: "Completed", stories: [] }
  ]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [featureNumbers, setFeatureNumbers] = useState<string[]>([]);

  // Update columns whenever userStories changes
  useEffect(() => {
    const rallyStories = userStories.filter(story => story.featureNumber);
    
    // Get unique feature numbers
    const uniqueFeatureNumbers = Array.from(
      new Set(rallyStories.map(story => story.featureNumber).filter(Boolean) as string[])
    );
    setFeatureNumbers(uniqueFeatureNumbers);
    
    setColumns(prev => prev.map(column => ({
      ...column,
      stories: rallyStories.filter(story => story.status === column.id)
    })));
  }, [userStories]);

  // Simple drag and drop functionality
  const handleDragStart = (e: React.DragEvent, storyId: string) => {
    e.dataTransfer.setData("text/plain", storyId);
    setDraggingId(storyId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const storyId = e.dataTransfer.getData("text/plain");
    setDraggingId(null);
    
    // Find the story and its source column
    let sourceColumnId: string | null = null;
    let story: UserStory | null = null;
    
    columns.forEach(column => {
      const foundStory = column.stories.find(s => s.id === storyId);
      if (foundStory) {
        sourceColumnId = column.id;
        story = foundStory;
      }
    });
    
    if (!sourceColumnId || !story || sourceColumnId === targetColumnId) return;
    
    // Update the story status in the userStories array
    const { userStories: allStories, setUserStories } = useAppContext();
    setUserStories(
      allStories.map(s => 
        s.id === storyId ? { ...s, status: targetColumnId as any } : s
      )
    );
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">Rally Board</CardTitle>
          <CardDescription>
            Drag and drop user stories between columns to update their status
          </CardDescription>
          {featureNumbers.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-sm font-medium">Feature Numbers:</span>
              {featureNumbers.map(featureNum => (
                <span 
                  key={featureNum} 
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {featureNum}
                </span>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-white rounded-md shadow p-4 min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <h3 className="font-medium text-lg mb-4 pb-2 border-b">
                  {column.title} 
                  <span className="text-muted-foreground ml-2">({column.stories.length})</span>
                </h3>
                <div className="space-y-3">
                  {column.stories.map((story) => (
                    <div
                      key={story.id}
                      className={`story-card p-3 rounded-md cursor-grab ${
                        draggingId === story.id ? "opacity-50" : ""
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, story.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{story.name}</h4>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          {story.id}
                        </span>
                      </div>
                      {story.featureNumber && (
                        <div className="mt-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {story.featureNumber}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {story.description}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Estimate: {story.planEstimate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
