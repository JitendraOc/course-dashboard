
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMemo } from 'react';
import { courseData } from '@/lib/data';
import { Progress } from './ui/progress';

export function MobileNavBar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

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

    const navItems = [
        { href: '#', label: 'Contact Support', icon: Phone, cta: true },
    ];

    if (!isMobile) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
            <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                <div className="inline-flex flex-col items-center justify-center px-5 h-full relative group text-muted-foreground">
                     <div className="w-full flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center relative">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-xs">Course Progress</p>
                            <Progress value={courseProgress} className="h-1.5 mt-1" />
                        </div>
                        <span className="text-xs font-semibold">{courseProgress}%</span>
                    </div>
                </div>
                 {navItems.map((item) => {
                    const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link href={item.href} key={item.label}>
                            <button
                                type="button"
                                className={cn(
                                    'inline-flex flex-col items-center justify-center px-5 h-full relative group w-full',
                                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <item.icon className="w-5 h-5 mb-1" />
                                <span className="text-xs">{item.label}</span>
                            </button>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
