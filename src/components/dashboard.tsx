'use client';
import {
  BookOpen,
  GraduationCap,
  Users,
  Zap,
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
import { useState, useRef, useEffect } from 'react';
import { courseData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import CourseContent from './course-content';
import { Button } from './ui/button';

export function Dashboard() {
  const [activeSubject, setActiveSubject] = useState(courseData[0].id);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const subjectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSubjectClick = (subjectId: string) => {
    setActiveSubject(subjectId);
    subjectRefs.current[subjectId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
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

    Object.values(subjectRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(subjectRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  const selectedSubject = courseData.find(s => s.id === activeSubject);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon">
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
                    <span className="flex-1">Course Materials</span>
                  </SidebarCollapsibleButton>
                  <SidebarCollapsibleContent>
                    <SidebarMenuSub>
                      {courseData.map((subject) => (
                          <SidebarMenuSubButton 
                            key={subject.id}
                            onClick={() => handleSubjectClick(subject.id)}
                            isActive={activeSubject === subject.id}
                          >
                            {subject.title}
                          </SidebarMenuSubButton>
                      ))}
                    </SidebarMenuSub>
                  </SidebarCollapsibleContent>
                </SidebarCollapsible>
              </Accordion>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Grades">
                  <GraduationCap />
                  Grades
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Contact Info">
                  <Users />
                  Contact Info
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
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
              <div className="flex-1 flex flex-col">
              <h1 className="text-lg font-semibold md:text-xl font-headline">Course Dashboard</h1>
            </div>
          </header>
          <div ref={contentAreaRef} className="flex-1 overflow-y-auto">
            <CourseContent 
              subjects={courseData}
              subjectRefs={subjectRefs}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
