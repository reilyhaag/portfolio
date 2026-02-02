import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl font-medium text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          This page doesn't exist.
        </p>
        <Link 
          href="/" 
          className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </main>
    </div>
  );
}
