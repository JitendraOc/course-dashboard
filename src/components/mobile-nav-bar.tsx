
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export function MobileNavBar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    const navItems = [
        { href: '/', label: 'Course', icon: BookOpen },
        { href: '/grades', label: 'Grades', icon: GraduationCap },
        // NOTE: The user has not created a contact page, so this link is disabled for now.
        { href: '#', label: 'Contact', icon: Users, disabled: true },
    ];

    if (!isMobile) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                {navItems.map((item) => {
                    const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link href={item.href} key={item.label}>
                            <button
                                type="button"
                                disabled={item.disabled}
                                className={cn(
                                    'inline-flex flex-col items-center justify-center px-5 h-full relative group',
                                    'disabled:opacity-50 disabled:cursor-not-allowed',
                                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <item.icon className="w-5 h-5 mb-1" />
                                <span className="text-xs">{item.label}</span>
                                {isActive && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
                                )}
                            </button>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
