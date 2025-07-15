'use client';

import { 
  useState
} from 'react';
import {
  Module, SubModule
} from '@/lib/data';
import SubModuleCard from './sub-module-card';
import { Badge } from './ui/badge';
import { Book, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

import { Subject } from '@/lib/data';

const CourseContent = ({ subject }: { subject: Subject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState < Module | null > (null);

  const inProgressSubModules = subject.modules.flatMap(module => 
    module.subModules.filter(subModule => subModule.status === 'in-progress')
  );

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      {inProgressSubModules.length > 0 && (
        <div>
          <h2 className="text-2xl font-headline font-semibold mb-4">Continue where you left off</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressSubModules.map((subModule) => (
              <SubModuleCard key={subModule.title} subModule={subModule} />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-headline font-semibold">Modules</h2>
          <p className="text-sm text-muted-foreground">
            {subject.learningObjective ? subject.learningObjective : "Explore the modules within this subject to achieve the course's overall learning objectives."}
          </p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {subject.modules.map((module) => {
            const totalDuration = module.subModules.reduce((acc, sm) => acc + sm.duration, 0);
            return (
              <div
                key={module.id}
                className="rounded-lg bg-card p-4 shadow-sm hover:bg-accent/50 cursor-pointer flex items-center gap-4"
                onClick={() => {
                  setSelectedModule(module);
                  setIsModalOpen(true);
                }}
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex w-full items-center justify-between">
                    <h2 className="font-headline text-xl font-semibold">{module.title}</h2>
                    <Badge variant="outline" className="flex items-center gap-2 p-2">
                      <Clock className="h-4 w-4" />
                      <span>~{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedModule?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col gap-4">
              {selectedModule?.subModules.map((subModule) => (
                <SubModuleCard key={subModule.title} subModule={subModule} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseContent;
