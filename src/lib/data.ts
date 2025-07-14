export type SubModule = {
  title: string;
  type: 'video' | 'epub' | 'plugin';
  duration: number; // in minutes
  status: 'completed' | 'in-progress' | 'not-started';
};

export type Module = {
  id: string;
  title: string;
  learningObjectives: string[];
  subModules: SubModule[];
};

export const courseData: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: Foundations of Web Development',
    learningObjectives: [
      'Understand the core concepts of HTML, CSS, and JavaScript.',
      'Build a simple static website.',
      'Learn about version control with Git.',
    ],
    subModules: [
      { title: 'Introduction to HTML', type: 'video', duration: 45, status: 'completed' },
      { title: 'Styling with CSS', type: 'video', duration: 60, status: 'completed' },
      { title: 'Core JavaScript Concepts', type: 'epub', duration: 90, status: 'in-progress' },
      { title: 'Git & GitHub Basics', type: 'plugin', duration: 30, status: 'not-started' },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2: Advanced CSS and Frameworks',
    learningObjectives: [
      'Master advanced CSS techniques like Flexbox and Grid.',
      'Learn a CSS preprocessor (Sass).',
      'Get started with a CSS framework like Tailwind CSS.',
    ],
    subModules: [
      { title: 'CSS Flexbox Deep Dive', type: 'video', duration: 75, status: 'not-started' },
      { title: 'Mastering CSS Grid', type: 'epub', duration: 80, status: 'not-started' },
      { title: 'Introduction to Sass', type: 'plugin', duration: 45, status: 'not-started' },
      { title: 'Building with Tailwind CSS', type: 'video', duration: 120, status: 'not-started' },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3: Modern JavaScript with React',
    learningObjectives: [
      'Understand the React component model.',
      'Manage state and props effectively.',
      'Learn about hooks and the context API.',
      'Build a dynamic single-page application.',
    ],
    subModules: [
      { title: 'Thinking in React', type: 'video', duration: 50, status: 'completed' },
      { title: 'State and Lifecycle', type: 'epub', duration: 65, status: 'in-progress' },
      { title: 'React Hooks Explained', type: 'video', duration: 85, status: 'not-started' },
      { title: 'Project: Build a To-Do App', type: 'plugin', duration: 150, status: 'not-started' },
    ],
  },
];
