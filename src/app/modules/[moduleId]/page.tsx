

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { courseData } from '@/lib/data';
import type { SubModule } from '@/lib/data';
import { cn } from '@/lib/utils';
import { CircleCheck, FileText, PlayCircle, Puzzle, ChevronRight, ArrowLeft, Maximize, Pause } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileModuleView } from '@/components/mobile-module-view';

const getIcon = (type: SubModule['type'], status: SubModule['status'], isActive: boolean) => {
    const iconProps = { className: "h-8 w-8 shrink-0" };

    if (isActive) {
        return (
            <div className="relative flex items-center justify-center">
                 <Pause {...iconProps} className="text-primary-foreground" />
            </div>
        )
    }

    if (status === 'completed') {
      return <CircleCheck {...iconProps} className={`${iconProps.className} text-green-600`} />;
    }

    switch (type) {
      case 'video':
        return <PlayCircle {...iconProps} />;
      case 'epub':
        return <FileText {...iconProps} />;
      case 'plugin':
        return <Puzzle {...iconProps} />;
      default:
        return null;
    }
};


export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { moduleId } = params;
  const isMobile = useIsMobile();


  const { currentModule, parentSubject } = useMemo(() => {
    for (const subject of courseData) {
      const module = subject.modules.find(m => m.id === moduleId);
      if (module) {
        return { currentModule: module, parentSubject: subject };
      }
    }
    return { currentModule: null, parentSubject: null };
  }, [moduleId]);

  const allSubModulesInCourse = useMemo(() =>
    courseData.flatMap(subject =>
      subject.modules.flatMap(module =>
        module.subModules.map(subModule => ({
          ...subModule,
          moduleId: module.id,
          subjectId: subject.id,
        }))
      )
    )
  , []);

  const [activeSubModule, setActiveSubModule] = useState<SubModule | null>(currentModule?.subModules[0] || null);
  
  const currentIndex = useMemo(() => {
      if (!activeSubModule || !currentModule) return -1;
      return allSubModulesInCourse.findIndex(sm => sm.title === activeSubModule.title && sm.moduleId === currentModule.id);
  }, [activeSubModule, allSubModulesInCourse, currentModule]);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < allSubModulesInCourse.length) {
      const nextItem = allSubModulesInCourse[nextIndex];
      const nextItemModule = courseData.flatMap(s => s.modules).find(m => m.id === nextItem.moduleId);
      if (nextItemModule && nextItemModule.id !== moduleId) {
        router.push(`/modules/${nextItemModule.id}`);
      } else {
        setActiveSubModule(nextItem);
      }
    } else if (direction === 'next' && nextIndex >= allSubModulesInCourse.length) {
      router.push('/');
    }
  }, [currentIndex, allSubModulesInCourse, moduleId, router]);


  if (!currentModule || !parentSubject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Module or Subject not found.</p>
        <Link href="/" className="ml-4">
            <Button variant="outline">Go back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return (
        <MobileModuleView 
            subjects={courseData}
            activeSubject={parentSubject}
            onSubjectChange={(subjectId) => {
                const newSubject = courseData.find(s => s.id === subjectId);
                if (newSubject) {
                    // Navigate to the first module of the new subject
                    router.push(`/modules/${newSubject.modules[0].id}`);
                }
            }}
        />
    )
  }

  const isFirstSubModuleInCourse = currentIndex === 0;
  const isLastSubModuleInCourse = currentIndex === allSubModulesInCourse.length - 1;
  const videoProgress = 20;

  return (
    <div className="flex h-screen bg-background flex-col md:flex-row">
      <aside className="w-full md:w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b hidden md:block">
            <h1 className="text-lg font-headline font-semibold">{parentSubject.title}</h1>
            <Link href="/" className="text-sm text-primary hover:underline">
                Back to course
            </Link>
        </div>
        <nav className="flex-1 overflow-y-auto">
            <Accordion type="single" collapsible defaultValue={currentModule.id} className="w-full">
                {parentSubject.modules.map(module => (
                    <AccordionItem value={module.id} key={module.id}>
                        <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:bg-accent/50">
                            {module.title}
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="p-2 pt-0 space-y-1">
                                {module.subModules.map((subModule, index) => {
                                  const isActive = activeSubModule?.title === subModule.title && module.id === currentModule.id;
                                  return (
                                    <li key={index}>
                                        <button
                                        onClick={() => {
                                            if (module.id !== currentModule.id) {
                                                router.push(`/modules/${module.id}`);
                                            } else {
                                                setActiveSubModule(subModule);
                                            }
                                        }}
                                        className={cn(
                                            "w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors",
                                            isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
                                        )}
                                        >
                                            <div className={cn(
                                                "h-12 w-12 rounded-lg flex items-center justify-center shrink-0",
                                                isActive ? 'bg-primary' : 'bg-muted'
                                            )}>
                                                {getIcon(subModule.type, subModule.status, isActive)}
                                            </div>

                                            <div className="flex-1 text-sm">
                                                <p className={cn("font-medium", isActive && "text-primary")}>{subModule.title}</p>
                                                <p className="text-xs text-muted-foreground">Chapter {index + 1}: {subModule.duration} min</p>
                                            </div>
                                        </button>
                                    </li>
                                  )
                                })}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </nav>
      </aside>
      <main className="hidden md:flex flex-1 flex-col">
        {activeSubModule ? (
          <div className="flex-1 flex flex-col">
            <header className="p-4 border-b">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Link href="/" className="hover:text-primary">Course</Link>
                <ChevronRight className="h-4 w-4" />
                <span>{parentSubject.title}</span>
                <ChevronRight className="h-4 w-4" />
                <span>{currentModule.title}</span>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">{activeSubModule.title}</span>
              </div>
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
                <Button variant="outline" onClick={() => navigate('prev')} disabled={isFirstSubModuleInCourse}>Previous</Button>
                <Button onClick={() => navigate('next')} disabled={isLastSubModuleInCourse}>Next</Button>
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

    
