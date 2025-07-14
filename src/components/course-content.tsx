'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { courseData } from '@/lib/data';
import SubModuleCard from './sub-module-card';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';

const CourseContent = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="mb-8">
        <p className="text-muted-foreground">
          Welcome back! Here is an overview of your course progress. Dive back in and continue your learning journey.
        </p>
      </div>
      <Accordion type="multiple" defaultValue={['module-1']} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {courseData.map((module) => {
          const totalDuration = module.subModules.reduce((acc, sm) => acc + sm.duration, 0);
          return (
            <AccordionItem key={module.id} value={module.id} className="border-none">
              <AccordionTrigger className="rounded-lg bg-card p-4 shadow-sm hover:bg-accent/50 hover:no-underline data-[state=open]:rounded-b-none data-[state=open]:bg-accent/80">
                <div className="flex w-full items-center justify-between">
                  <div className="text-left">
                    <h2 className="font-headline text-xl font-semibold">{module.title}</h2>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-2 p-2">
                    <Clock className="h-4 w-4" />
                    <span>~{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="rounded-lg rounded-t-none border border-t-0 bg-card p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-headline text-lg font-medium mb-3">Learning Objectives</h3>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    {module.learningObjectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {module.subModules.map((subModule) => (
                    <SubModuleCard key={subModule.title} subModule={subModule} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CourseContent;
