
'use client';

import React from 'react';
import Joyride, { type Step } from 'react-joyride';

type AppTourProps = {
    run: boolean;
};

export function AppTour({ run }: AppTourProps) {
    const steps: Step[] = [
        {
            target: '#tour-step-0',
            content: "Welcome to CourseFlow! Let's take a quick tour of the dashboard.",
            placement: 'bottom',
        },
        {
            target: '#tour-step-1',
            content: 'Here you can find all your course materials, organized by subject. Click on a subject to see its modules.',
            placement: 'right',
        },
        {
            target: '#tour-step-2',
            content: 'This section helps you quickly resume your last viewed lesson.',
            placement: 'bottom',
        },
        {
            target: '#tour-step-3',
            content: 'Keep an eye on your overall course progress and find your mentor\'s contact information here.',
            placement: 'left',
        },
        {
            target: '#tour-step-4',
            content: 'All the modules for the selected subject are listed here. Click on any module to start learning!',
            placement: 'right',
        },
    ];

    return (
        <Joyride
            run={run}
            steps={steps}
            continuous
            showProgress
            showSkipButton
            styles={{
                options: {
                    zIndex: 10000,
                    primaryColor: '#3359a7',
                    textColor: '#333',
                    arrowColor: '#ffffff',
                    backgroundColor: '#ffffff',
                },
                buttonClose: {
                    display: 'none',
                },
            }}
        />
    );
}
