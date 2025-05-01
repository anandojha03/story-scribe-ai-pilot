
export type AIModelType = "gemini" | "chatgpt";

export interface UserStory {
  id: string;
  name: string;
  description: string;
  planEstimate: number;
  notes: string;
  status: "backlog" | "defined" | "inProgress" | "completed";
  featureNumber?: string;
}

export interface RallyColumn {
  id: string;
  title: string;
  stories: UserStory[];
}

export interface SolutionDocument {
  content: string;
  fileName?: string;
  fileType?: string;
}
