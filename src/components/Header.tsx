
import { Button } from "@/components/ui/button";
import { Braces } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => navigate("/")} role="button">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <Braces className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">AI Product Owner</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="outline" onClick={() => navigate("/rally")}>
            Rally Board
          </Button>
        </div>
      </div>
    </header>
  );
}
