
'use client';
import { useMemo } from 'react';
import { courseData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Phone, Clock, CalendarClock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export function CourseSection() {
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
        <div className="space-y-6">
            <h2 className="text-lg font-semibold font-headline mb-4">Course Section</h2>
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
                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold">Personal Mentor</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage data-ai-hint="woman person" src="https://placehold.co/80x80.png" />
                            <AvatarFallback className="text-2xl">OS</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold">Olivia Smith</h3>
                            <p className="text-sm text-muted-foreground">support@ocacademy.in</p>
                        </div>
                        <div className="w-full space-y-2">
                            <Button variant="outline" className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Send an email
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Phone className="mr-2 h-4 w-4" />
                                Schedule a call
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
    );
}
