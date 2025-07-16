
'use client';

import { useState, useMemo } from 'react';
import type { Subject, Module, SubModule } from '@/lib/data';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Maximize, PlayCircle, Pause, CircleCheck, FileText, Puzzle, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Link from 'next/link';

const getIcon = (type: SubModule['type'], status: SubModule['status'], isActive: boolean) => {
    const iconProps = { className: "h-6 w-6" };

    if (isActive) {
        return (
            <div className="relative flex items-center justify-center">
                 <Pause {...iconProps} className="text-white" />
            </div>
        )
    }

    if (status === 'completed') {
      return <CircleCheck {...iconProps} className="text-green-500" />;
    }
    
    switch (type) {
      case 'video':
        return <PlayCircle {...iconProps} className="text-muted-foreground" />;
      case 'epub':
        return <FileText {...iconProps} className="text-muted-foreground" />;
      case 'plugin':
        return <Puzzle {...iconProps} className="text-muted-foreground" />;
      default:
        return null;
    }
};

export function MobileModuleView({ subjects, activeSubject, onSubjectChange }: { subjects: Subject[], activeSubject: Subject, onSubjectChange: (subjectId: string) => void }) {
    const [activeModule, setActiveModule] = useState<Module>(activeSubject.modules[0]);
    const [activeSubModule, setActiveSubModule] = useState<SubModule>(activeModule.subModules[0]);

    const videoProgress = 20; // Example progress

    const handleModuleChange = (module: Module) => {
        setActiveModule(module);
        setActiveSubModule(module.subModules[0]);
    }

    const defaultAccordionValue = useMemo(() => activeSubject.modules.map(m => m.id), [activeSubject]);

    return (
        <div className="bg-background">
            <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm p-4 border-b">
                 <div className="flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <h1 className="font-semibold text-lg">{activeSubModule.title}</h1>
                    <Button variant="ghost" size="icon">
                        <Maximize />
                    </Button>
                </div>
            </header>
            
            <main className="p-4">
                <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    <Image src="https://placehold.co/1600x900.png" alt="Video thumbnail" layout="fill" objectFit="cover" data-ai-hint="lesson thumbnail" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <button className="bg-white/30 backdrop-blur-sm text-white rounded-full p-4">
                            <PlayCircle className="h-8 w-8" />
                        </button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-white text-xs">
                        <div className="flex justify-between items-center px-2">
                            <span>1:23 / 10:45</span>
                            <span>CC</span>
                        </div>
                        <Progress value={videoProgress} className="h-1 mt-1 bg-white/30 [&>div]:bg-white" />
                    </div>
                </div>

                <Select onValueChange={onSubjectChange} defaultValue={activeSubject.id}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map(subject => (
                            <SelectItem key={subject.id} value={subject.id}>
                                Subject: {subject.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="mt-6">
                    <Accordion type="multiple" defaultValue={defaultAccordionValue} className="w-full space-y-4">
                        {activeSubject.modules.map(module => (
                            <AccordionItem value={module.id} key={module.id} className="border-none">
                                <AccordionTrigger 
                                    onClick={() => handleModuleChange(module)}
                                    className="text-lg font-semibold hover:no-underline p-0"
                                >
                                    {module.title}
                                </AccordionTrigger>
                                <AccordionContent className="pt-4">
                                    <ul className="space-y-2">
                                        {module.subModules.map((subModule, index) => {
                                            const isActive = activeSubModule?.title === subModule.title && module.id === activeModule.id;
                                            return (
                                                <li key={index}>
                                                    <button
                                                        onClick={() => setActiveSubModule(subModule)}
                                                        className={cn(
                                                            "w-full text-left p-3 rounded-lg flex items-center gap-4 transition-all",
                                                            isActive ? "bg-primary/10 border border-primary/20 shadow-sm" : ""
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "h-12 w-12 rounded-lg flex items-center justify-center shrink-0",
                                                            isActive ? 'bg-primary' : 'bg-muted'
                                                        )}>
                                                            {getIcon(subModule.type, subModule.status, isActive)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={cn("font-medium", isActive ? "text-primary" : "text-foreground")}>
                                                                {isActive && "Now Playing: "} {subModule.title}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Chapter {index + 1}: {subModule.duration} min
                                                            </p>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </Button>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
            <footer className="sticky bottom-0 z-20 bg-background border-t p-2">
                <nav className="flex justify-around">
                    <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-muted-foreground">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <span>Home</span>
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary">
                        <PlayCircle className="h-6 w-6" />
                        <span>Courses</span>
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                        <span>Bookmarks</span>
                    </Button>
                     <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                        <span>Profile</span>
                    </Button>
                </nav>
            </footer>
        </div>
    );
}

    