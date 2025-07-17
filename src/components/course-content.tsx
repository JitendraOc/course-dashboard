
'use client';

import React, { type MutableRefObject } from 'react';
import Link from 'next/link';
import { Subject } from '@/lib/data';
import SubModuleCard from './sub-module-card';
import { Badge } from './ui/badge';
import { Book, Clock } from 'lucide-react';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from './ui/label';

const CourseContent = ({
  subjects,
  subjectRefs,
  activeSubject,
  onSubjectChange,
}: {
  subjects: Subject[];
  subjectRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  activeSubject: string;
  onSubjectChange: (subjectId: string) => void;
}) => {
  const inProgressSubModules = subjects.flatMap(subject =>
    subject.modules.flatMap(module =>
      module.subModules.filter(subModule => subModule.status === 'in-progress')
    )
  );

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 relative">
      <div id="tour-step-2" className="sticky top-10 bg-background/95 backdrop-blur-sm z-10 -my-4 mb-4">
          {inProgressSubModules.length > 0 && (
            <>
              <h2 className="text-xl md:text-2xl font-headline font-semibold mb-4">Continue where you left off</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
                {inProgressSubModules.slice(0, 1).map((subModule) => (
                  <SubModuleCard key={`${subModule.title}-${Math.random()}`} subModule={subModule} />
                ))}
              </div>
              <div className="h-8"></div>
            </>
          )}
      </div>
      

      <div id="tour-step-4" className="space-y-12">
        {subjects.map((subject, index) => (
          <React.Fragment key={subject.id}>
             {index > 0 && <Separator className="my-8" />}
            <div 
              ref={(el) => (subjectRefs.current[subject.id] = el)}
              data-subject-id={subject.id}
            >
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-headline font-semibold">{subject.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {subject.learningObjective ? subject.learningObjective : "Explore the modules within this subject to achieve the course's overall learning objectives."}
                </p>
              </div>
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                {subject.modules.map((module) => {
                  const totalDuration = module.subModules.reduce((acc, sm) => acc + sm.duration, 0);
                  return (
                    <Link href={`/modules/${module.id}`} key={module.id} className="block">
                      <div
                        className="rounded-lg bg-card p-4 shadow-sm hover:bg-sidebar-accent cursor-pointer flex items-center gap-4 h-full"
                      >
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Book className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex w-full items-center justify-between">
                            <h2 className="font-headline text-lg md:text-xl font-semibold">{module.title}</h2>
                            <Badge variant="outline" className="flex items-center gap-2 p-2 shrink-0">
                              <Clock className="h-4 w-4" />
                              <span>~{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
