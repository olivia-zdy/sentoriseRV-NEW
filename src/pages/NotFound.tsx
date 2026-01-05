import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-display mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[hsl(160,84%,45%)] to-[hsl(200,90%,45%)] text-[hsl(0,0%,4%)] font-semibold hover:opacity-90 transition-opacity"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
