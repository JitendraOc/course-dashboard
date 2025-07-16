
'use client';
import {
  BookOpen,
  CalendarClock,
  GraduationCap,
  Users,
  Zap,
  Mail,
  Phone,
  Clock
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
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileModuleView } from './mobile-module-view';

export function Dashboard() {
  const isMobile = useIsMobile();
  const [activeSubject, setActiveSubject] = useState(courseData[0].id);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const subjectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSubjectChange = (subjectId: string) => {
    setActiveSubject(subjectId);
    if (!isMobile) {
      subjectRefs.current[subjectId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
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
  
  if (isMobile) {
    return (
        <MobileModuleView 
            subjects={courseData}
            activeSubject={selectedSubject || courseData[0]}
            onSubjectChange={handleSubjectChange}
        />
    )
  }


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
                            onClick={() => handleSubjectChange(subject.id)}
                            isActive={activeSubject === subject.id}
                            className="whitespace-normal h-auto py-2 text-sm relative"
                          >
                            {activeSubject === subject.id && <div className="absolute left-[-9px] top-0 h-full w-1 bg-primary rounded-r-full"></div>}
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
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-semibold md:text-xl font-headline">Course Dashboard</h1>
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
            <aside className="hidden lg:block w-72 border-l p-4 md:p-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
                <h2 className="text-lg font-semibold font-headline mb-4">Course Section</h2>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base md:text-lg">Course Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Progress value={courseProgress} className="w-full" />
                                <span className="font-semibold text-sm md:text-base text-primary">{courseProgress}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">You've completed {completedSubModules} out of {totalSubModules} learning activities.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage data-ai-hint="woman person" src="https://placehold.co/80x80.png" />
                                    <AvatarFallback className="text-2xl">AM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">Dr. Ananya Murali</h3>
                                    <p className="text-sm text-muted-foreground">Your Personal Mentor</p>
                                </div>
                                <div className="w-full space-y-2">
                                    <Button variant="outline" className="w-full">
                                        <Mail className="mr-2 h-4 w-4" />
                                        ananya.murali@ocacademy.in
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Phone className="mr-2 h-4 w-4" />
                                        +91-9611376348
                                    </Button>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-2 h-4 w-4" />
                                    <span>10:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    <Badge variant="outline" className="w-full flex items-center justify-center gap-2 p-3 text-sm">
                        <CalendarClock className="h-5 w-5" />
                        <span>Access ends: Dec 31, 2024</span>
                    </Badge>
                </div>
            </aside>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

    