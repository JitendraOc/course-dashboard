
'use client';
import {
  BookOpen,
  CalendarClock,
  GraduationCap,
  Users,
  Zap,
  RefreshCcw,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarCollapsible,
  SidebarCollapsibleButton,
  SidebarCollapsibleContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from './ui/sidebar';
import { Accordion } from './ui/accordion';
import { useState, useRef, useEffect, useMemo } from 'react';
import { courseData, type Subject } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import CourseContent from './course-content';
import { Button } from './ui/button';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileModuleView } from './mobile-module-view';
import { CourseSection } from './course-section';
import { AppTour } from './app-tour';
import { MobileNavBar } from './mobile-nav-bar';

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


export function Dashboard() {
  const isMobile = useIsMobile();
  const [activeSubject, setActiveSubject] = useState(courseData[0].id);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const subjectRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [runTour, setRunTour] = useState(false);
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    // Only run this on the client
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        setRunTour(true);
        localStorage.setItem('hasSeenTour', 'true');
      }
    }
  }, []);

  const handleSubjectChange = (subjectId: string) => {
    setActiveSubject(subjectId);
    if (!isMobile) {
      subjectRefs.current[subjectId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleRestartTour = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('hasSeenTour');
        setRunTour(false);
        // A small timeout to allow state to update before starting the tour
        setTimeout(() => {
            setRunTour(true);
            localStorage.setItem('hasSeenTour', 'true');
        }, 100);
    }
  };

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const subjectId = entry.target.getAttribute('data-subject-id');
            if (subjectId) {
              setActiveSubject(subjectId);
            }
          }
        });
      },
      { root: contentAreaRef.current, threshold: 0.5 }
    );

    const refs = Object.values(subjectRefs.current);
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile]);
  
  const selectedSubject = useMemo(() => courseData.find(s => s.id === activeSubject), [activeSubject]);

  if (isMobile) {
    return (
      <div className="pb-16">
        <MobileModuleView 
            subjects={courseData}
            activeSubject={selectedSubject || courseData[0]}
            onSubjectChange={handleSubjectChange}
        />
        <MobileNavBar />
      </div>
    )
  }


  return (
    <SidebarProvider>
      {isClient && <AppTour run={runTour} />}
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" id="tour-step-1">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Zap className="h-6 w-6 text-primary" />
              </Button>
              <h1 className="font-headline text-lg font-semibold text-primary">CourseFlow</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <Accordion type="multiple" defaultValue={['course-materials']} className="w-full">
                <SidebarCollapsible value="course-materials">
                  <SidebarCollapsibleButton>
                    <BookOpen />
                    <span className="flex-1 text-left">Course Materials</span>
                  </SidebarCollapsibleButton>
                  <SidebarCollapsibleContent>
                    <SidebarMenuSub>
                      {courseData.map((subject) => {
                        const progress = getSubjectProgress(subject);
                        return (
                          <SidebarMenuSubButton 
                            key={subject.id}
                            onClick={() => handleSubjectChange(subject.id)}
                            isActive={activeSubject === subject.id}
                            className="whitespace-normal h-auto py-2 text-sm relative justify-between"
                          >
                            <span className="flex-1 text-left">{subject.title}</span>
                             <span className="text-xs text-muted-foreground">{progress}%</span>
                            {activeSubject === subject.id && <div className="absolute left-[-9px] top-0 h-full w-1 bg-primary rounded-r-full"></div>}
                          </SidebarMenuSubButton>
                        )
                      })}
                    </SidebarMenuSub>
                  </SidebarCollapsibleContent>
                </SidebarCollapsible>
              </Accordion>

              <SidebarMenuItem>
                <Link href="/grades">
                  <SidebarMenuButton tooltip="Grades">
                    <GraduationCap />
                    Grades
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Contact Info">
                  <Users />
                  Contact Info
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Restart Tour" onClick={handleRestartTour}>
                  <RefreshCcw />
                  Restart Tour
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-3 p-3">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Jane Doe</span>
                <span className="text-xs text-muted-foreground">jane.doe@example.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header id="tour-step-0" className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-semibold md:text-xl font-headline">Fullstack Developer Course</h1>
            </div>
          </header>
          <div ref={contentAreaRef} className="flex flex-1">
            <div className="flex-1 overflow-y-auto">
                <CourseContent 
                subjects={courseData}
                subjectRefs={subjectRefs}
                activeSubject={activeSubject}
                onSubjectChange={handleSubjectChange}
                />
            </div>
            <aside id="tour-step-3" className="hidden lg:block w-72 border-l p-4 md:p-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
                <CourseSection />
            </aside>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
