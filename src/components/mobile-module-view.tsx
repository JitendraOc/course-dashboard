
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Subject, Module, SubModule } from '@/lib/data';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Maximize, PlayCircle, Pause, CircleCheck, FileText, Puzzle, MoreHorizontal, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { CourseSection } from './course-section';

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

const getSubjectProgress = (subject: Subject) => {
    let totalSubModules = 0;
    let completedSubModules = 0;
    subject.modules.forEach(module => {
        totalSubModules += module.subModules.length;
        completedSubModules += module.subModules.filter(sm => sm.status === 'completed').length;
    });
    if (totalSubModules === 0) return 0;
    return Math.round((completedSubModules / totalSubModules) * 100);
}

export function MobileModuleView({ subjects, activeSubject, onSubjectChange }: { subjects: Subject[], activeSubject: Subject, onSubjectChange: (subjectId: string) => void }) {
    const [activeModule, setActiveModule] = useState<Module>(activeSubject.modules[0]);
    const [activeSubModule, setActiveSubModule] = useState<SubModule>(activeModule.subModules[0]);

    useEffect(() => {
        setActiveModule(activeSubject.modules[0]);
        setActiveSubModule(activeSubject.modules[0].subModules[0]);
    }, [activeSubject]);

    const videoProgress = 20; // Example progress

    const handleModuleChange = (module: Module) => {
        setActiveModule(module);
        if(activeModule.id !== module.id) {
            setActiveSubModule(module.subModules[0]);
        }
    }
    
    const defaultAccordionValue = useMemo(() => activeSubject.modules.map(m => m.id), [activeSubject]);

    return (
        <div className="bg-background min-h-screen pb-20">
            <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm p-4 border-b">
                 <div className="flex items-center">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <h1 className="font-semibold text-sm md:text-base">{activeSubModule.title}</h1>
                </div>
            </header>
            
            <div className="sticky top-[73px] z-10 bg-background/95 backdrop-blur-sm p-4 pt-2">
                <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    <Image src="https://placehold.co/1600x900.png" alt="Video thumbnail" layout="fill" objectFit="cover" data-ai-hint="lesson thumbnail" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button variant="ghost" className="bg-white/30 backdrop-blur-sm text-white rounded-full p-4 h-auto">
                            <PlayCircle className="h-8 w-8" />
                        </Button>
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
                    <SelectTrigger className="w-full bg-secondary border-border/80">
                        <SelectValue placeholder="Select a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map(subject => {
                            const progress = getSubjectProgress(subject);
                            return (
                                <SelectItem key={subject.id} value={subject.id}>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="flex-1 mr-4">Sub: {subject.title}</span>
                                        <span className="text-muted-foreground text-xs ml-4">{progress}%</span>
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>
            
            <main className="p-4">
                <div className="mt-2">
                    <Accordion type="multiple" defaultValue={defaultAccordionValue} className="w-full space-y-4">
                        {activeSubject.modules.map(module => (
                            <AccordionItem value={module.id} key={module.id} className="border-none">
                                <div onClick={() => handleModuleChange(module)} className="text-base md:text-lg font-semibold hover:no-underline p-0 cursor-pointer">
                                    <AccordionTrigger>
                                        {module.title}
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-4">
                                    <ul className="space-y-2">
                                        {module.subModules.map((subModule, index) => {
                                            const isActive = activeSubModule?.title === subModule.title && module.id === activeModule.id;
                                            return (
                                                <li key={index}>
                                                    <div
                                                        onClick={() => setActiveSubModule(subModule)}
                                                        className={cn(
                                                            "w-full text-left p-3 rounded-lg flex items-center gap-4 transition-all cursor-pointer",
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
                                                            <p className={cn("font-medium text-sm md:text-base", isActive ? "text-primary" : "text-foreground")}>
                                                                {isActive && "Now Playing: "} {subModule.title}
                                                            </p>
                                                            <p className="text-xs md:text-sm text-muted-foreground">
                                                                Chapter {index + 1}: {subModule.duration} min
                                                            </p>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={(e) => { e.stopPropagation(); /* handle more options */ }}>
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </Button>
                                                    </div>
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
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="fixed bottom-20 left-4 h-12 w-12 rounded-full shadow-lg"
                    >
                        <LayoutGrid className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="p-4">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Course Section</SheetTitle>
                    </SheetHeader>
                    <CourseSection />
                </SheetContent>
            </Sheet>
        </div>
    );
}
