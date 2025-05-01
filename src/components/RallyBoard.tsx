
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RallyColumn, UserStory } from "@/types";

// Initial dummy data for the Rally board columns
const initialColumns: RallyColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    stories: [
      {
        id: "RS1",
        name: "Setup Project Structure",
        description: "Set up the basic project structure with FastAPI backend and React frontend.",
        planEstimate: 3,
        notes: "Include Docker configuration.",
        status: "backlog"
      },
      {
        id: "RS2",
        name: "Configure Authentication",
        description: "Implement authentication system for the application.",
        planEstimate: 5,
        notes: "Use JWT tokens for authentication.",
        status: "backlog"
      }
    ]
  },
  {
    id: "defined",
    title: "Defined",
    stories: [
      {
        id: "RS3",
        name: "Design User Interface",
        description: "Create the initial design mockups for the application.",
        planEstimate: 3,
        notes: "Follow the design system.",
        status: "defined"
      }
    ]
  },
  {
    id: "inProgress",
    title: "In Progress",
    stories: [
      {
        id: "RS4",
        name: "Document API Endpoints",
        description: "Create documentation for all API endpoints.",
        planEstimate: 2,
        notes: "Use Swagger for documentation.",
        status: "inProgress"
      }
    ]
  },
  {
    id: "completed",
    title: "Completed",
    stories: [
      {
        id: "RS5",
        name: "Setup CI/CD Pipeline",
        description: "Configure CI/CD pipeline for automatic deployments.",
        planEstimate: 3,
        notes: "Use GitHub Actions.",
        status: "completed"
      }
    ]
  }
];

export function RallyBoard() {
  const [columns, setColumns] = useState<RallyColumn[]>(initialColumns);
  const [draggingId, setDraggingId] = useState<string | null>(null);

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
    
    // Remove from source column and add to target column
    setColumns(prev => prev.map(column => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          stories: column.stories.filter(s => s.id !== storyId)
        };
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          stories: [...column.stories, { ...story!, status: targetColumnId as any }]
        };
      }
      return column;
    }));
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">Rally Board</CardTitle>
          <CardDescription>
            Drag and drop user stories between columns to update their status
          </CardDescription>
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
