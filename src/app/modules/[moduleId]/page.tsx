'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { courseData } from '@/lib/data';
import type { SubModule } from '@/lib/data';
import { cn } from '@/lib/utils';
import { CircleCheck, FileText, PlayCircle, Puzzle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getIcon = (type: SubModule['type'], status: SubModule['status']) => {
    const iconProps = { className: "h-5 w-5 shrink-0" };
    if (status === 'completed') {
      return <CircleCheck {...iconProps} className={`${iconProps.className} text-green-600`} />;
    }
    const colorClass = "text-muted-foreground";
    switch (type) {
      case 'video':
        return <PlayCircle {...iconProps} className={`${iconProps.className} ${colorClass}`} />;
      case 'epub':
        return <FileText {...iconProps} className={`${iconProps.className} ${colorClass}`} />;
      case 'plugin':
        return <Puzzle {...iconProps} className={`${iconProps.className} ${colorClass}`} />;
      default:
        return null;
    }
};

export default function ModulePage() {
  const params = useParams();
  const { moduleId } = params;

  const module = useMemo(() => 
    courseData
      .flatMap(subject => subject.modules)
      .find(m => m.id === moduleId),
    [moduleId]
  );

  const [activeSubModule, setActiveSubModule] = useState<SubModule | null>(module?.subModules[0] || null);

  if (!module) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Module not found.</p>
        <Link href="/" className="ml-4">
            <Button variant="outline">Go back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-lg font-headline font-semibold">{module.title}</h1>
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to course
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2">
            {module.subModules.map((subModule, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveSubModule(subModule)}
                  className={cn(
                    "w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors",
                    activeSubModule?.title === subModule.title ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                  )}
                >
                  {getIcon(subModule.type, subModule.status)}
                  <span className="flex-1 text-sm">{subModule.title}</span>
                  <span className="text-xs text-muted-foreground">{subModule.duration} min</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        {activeSubModule ? (
          <div className="flex-1 flex flex-col">
            <header className="p-4 border-b">
              <h2 className="text-xl font-headline font-semibold">{activeSubModule.title}</h2>
            </header>
            <div className="flex-1 p-6 overflow-y-auto">
              {activeSubModule.type === 'video' && (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Video Player Placeholder</p>
                  </div>
              )}
              {activeSubModule.type === 'epub' && (
                  <div className="prose max-w-none">
                      <p>EPUB content for "{activeSubModule.title}" would be displayed here.</p>
                  </div>
              )}
               {activeSubModule.type === 'plugin' && (
                  <div className="prose max-w-none">
                      <p>Plugin content for "{activeSubModule.title}" would be displayed here.</p>
                  </div>
              )}
            </div>
            <footer className="p-4 border-t flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Next</Button>
            </footer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a sub-module to begin.</p>
          </div>
        )}
      </main>
    </div>
  );
}
