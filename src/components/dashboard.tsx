
'use client';
import {
  BookOpen,
  CalendarClock,
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
import { useState, useRef, useEffect, useMemo } from 'react';
import { courseData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import CourseContent from './course-content';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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

    const refs = Object.values(subjectRefs.current);
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  const selectedSubject = courseData.find(s => s.id === activeSubject);

  const { totalSubModules, completedSubModules } = useMemo(() => {
    let total = 0;
    let completed = 0;
    courseData.forEach(subject => {
        subject.modules.forEach(module => {
            total += module.subModules.length;
            completed += module.subModules.filter(sm => sm.status === 'completed').length;
        });
    });
    return { totalSubModules: total, completedSubModules: completed };
  }, []);

  const courseProgress = totalSubModules > 0 ? Math.round((completedSubModules / totalSubModules) * 100) : 0;

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
                    <span className="flex-1 text-left">Course Materials</span>
                  </SidebarCollapsibleButton>
                  <SidebarCollapsibleContent>
                    <SidebarMenuSub>
                      {courseData.map((subject) => (
                          <SidebarMenuSubButton 
                            key={subject.id}
                            onClick={() => handleSubjectClick(subject.id)}
                            isActive={activeSubject === subject.id}
                            className="whitespace-normal h-auto py-2 text-sm"
                          >
                            {subject.title}
                          </SidebarMenuSubButton>
                      ))}
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
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-semibold md:text-xl font-headline">Course Dashboard</h1>
            </div>
            <Badge variant="outline" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Access ends: December 31, 2024</span>
            </Badge>
          </header>
          <div ref={contentAreaRef} className="flex-1 overflow-y-auto">
             <div className="p-4 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl">Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Progress value={courseProgress} className="w-full" />
                            <span className="font-semibold text-base md:text-lg text-primary">{courseProgress}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">You've completed {completedSubModules} out of {totalSubModules} learning activities.</p>
                    </CardContent>
                </Card>
            </div>
            <CourseContent 
              subjects={courseData}
              subjectRefs={subjectRefs}
              activeSubject={activeSubject}
              onSubjectChange={handleSubjectClick}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
