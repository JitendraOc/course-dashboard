
'use client';

import Link from 'next/link';
import {
  BookOpen,
  CalendarClock,
  GraduationCap,
  Users,
  Zap,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
} from '@/components/ui/sidebar';
import { Accordion } from '@/components/ui/accordion';
import { useState } from 'react';
import { courseData, gradesData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Lock, AlertTriangle } from 'lucide-react';

export default function GradesPage() {
    const [activeSubject, setActiveSubject] = useState(courseData[0].id);

    const handleSubjectClick = (subjectId: string) => {
        // In a real app, you'd likely navigate to the dashboard and scroll.
        // For now, we just set the active subject for visual feedback in the sidebar.
        setActiveSubject(subjectId);
    };

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
            <Accordion type="multiple" defaultValue={[]} className="w-full">
              <SidebarCollapsible value="course-materials">
                <SidebarCollapsibleButton>
                  <BookOpen />
                  <span className="flex-1 text-left">Course Materials</span>
                </SidebarCollapsibleButton>
                <SidebarCollapsibleContent>
                  <SidebarMenuSub>
                    {courseData.map((subject) => (
                        <Link href="/" key={subject.id}>
                            <SidebarMenuSubButton
                              className="whitespace-normal h-auto py-2 text-sm relative justify-between"
                            >
                              <span className="flex-1 text-left">
                                {subject.title}
                              </span>
                            </SidebarMenuSubButton>
                        </Link>
                    ))}
                  </SidebarMenuSub>
                </SidebarCollapsibleContent>
              </SidebarCollapsible>
            </Accordion>

            <SidebarMenuItem>
                <Link href="/grades">
                    <SidebarMenuButton tooltip="Grades" isActive>
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
            <h1 className="text-lg font-semibold md:text-xl font-headline">Grades</h1>
            </div>
            <Badge variant="outline" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>Access ends: December 31, 2024</span>
            </Badge>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <Alert className="mb-8" style={{ backgroundColor: '#fcc22920', borderColor: '#fcc22980', color: '#8c6d1f' }}>
                <AlertTriangle className="h-5 w-5 !text-yellow-500" style={{ color: '#fcc229' }} />
                <AlertDescription className="flex items-center gap-2">
                    <span className="text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#fcc229' }}>1</span>
                    You have 1 assessment coming up. Be sure to submit it before the deadline.
                </AlertDescription>
            </Alert>

            <div className="rounded-lg border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-2/4">Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gradesData.map((assignment) => (
                    <TableRow key={assignment.id}>
                        <TableCell>
                        <div className="flex items-center gap-4">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                            <div>
                            <p className="font-medium text-primary">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">Graded Assignment</p>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell>
                        <div className="flex items-center gap-2">
                            <Info className="h-5 w-5 text-muted-foreground" />
                            <span>{assignment.status}</span>
                        </div>
                        </TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>{assignment.weight > 0 ? `${assignment.weight}%` : '0%'}</TableCell>
                        <TableCell>{assignment.grade}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
  );
}
