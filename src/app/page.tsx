
'use client';

import { Dashboard } from '@/components/dashboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileModuleView } from '@/components/mobile-module-view';
import { courseData } from '@/lib/data';
import { useState } from 'react';


export default function Home() {
  const isMobile = useIsMobile();
  const [activeSubject, setActiveSubject] = useState(courseData[0]);

  if (isMobile) {
    return <MobileModuleView 
      subjects={courseData} 
      activeSubject={activeSubject}
      onSubjectChange={(subjectId) => {
        const newSubject = courseData.find(s => s.id === subjectId);
        if (newSubject) setActiveSubject(newSubject);
      }}
    />
  }

  return (
    <main>
      <Dashboard />
    </main>
  );
}

    