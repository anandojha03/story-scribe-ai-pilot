
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";

export function ResetButton() {
  const { resetApp } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    // Simulate a short delay for UX purposes
    await new Promise(resolve => setTimeout(resolve, 500));
    resetApp();
    setIsResetting(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsDialogOpen(true)}
        className="animate-fade-in"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Reset Application
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Reset Application</DialogTitle>
            <DialogDescription>
              This will clear all uploaded documents, generated user stories, and reset selected model. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReset}
              disabled={isResetting}
            >
              {isResetting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Everything'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
