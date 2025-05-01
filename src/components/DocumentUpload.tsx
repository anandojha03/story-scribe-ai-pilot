
import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, UploadCloud } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { SolutionDocument } from "@/types";

export function DocumentUpload() {
  const { setDocumentContent } = useAppContext();
  const { toast } = useToast();
  const [directInput, setDirectInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    // Check file type
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would extract text from the file
    // For now, we'll just use the file name
    setFileName(file.name);
    setDocumentContent({
      content: `Content from ${file.name}`,
      fileName: file.name,
      fileType: file.type
    });
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0]);
    }
  };

  const handleTextSubmit = () => {
    if (!directInput.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setDocumentContent({
      content: directInput,
    });
    
    toast({
      title: "Text submitted",
      description: "Your text has been submitted successfully.",
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Solution Document</CardTitle>
        <CardDescription>
          Upload a PDF/DOCX document or enter your solution details directly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="direct">Direct Input</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="mt-4">
            <div
              className={`upload-dropzone ${isDragging ? "active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center">
                <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                {fileName ? (
                  <div className="text-center">
                    <p className="font-medium text-primary">{fileName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click or drag to upload another file
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF or DOCX (max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="direct" className="mt-4 space-y-4">
            <Textarea
              placeholder="Enter your solution document text here..."
              className="min-h-[200px]"
              value={directInput}
              onChange={(e) => setDirectInput(e.target.value)}
            />
            <Button className="w-full" onClick={handleTextSubmit}>
              <FileText className="mr-2 h-4 w-4" />
              Submit Text
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
