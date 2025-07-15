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

export type Subject = {
  id: string;
  title: string;
  modules: Module[];
  learningObjective?: string;
}

export type GradedAssignment = {
  id: string;
  title: string;
  status: 'Locked' | 'Submitted' | 'Graded';
  dueDate: string;
  weight: number;
  grade: string;
};

export const gradesData: GradedAssignment[] = [
    {
        id: 'assignment-1',
        title: 'Module 1 Challenge: The basics of user experience design',
        status: 'Locked',
        dueDate: 'Jul 23, 11:59 PM PDT',
        weight: 33.33,
        grade: '--',
    },
    {
        id: 'assignment-2',
        title: 'Module 2 challenge: Thinking like a UX designer',
        status: 'Locked',
        dueDate: 'Jul 28, 11:59 PM PDT',
        weight: 33.33,
        grade: '--',
    },
    {
        id: 'assignment-3',
        title: 'Module 3 challenge: Design sprints',
        status: 'Locked',
        dueDate: 'Aug 1, 11:59 PM PDT',
        weight: 33.33,
        grade: '--',
    },
    {
        id: 'assignment-4',
        title: 'Module 4 Challenge: Research in the design process',
        status: 'Locked',
        dueDate: 'Aug 6, 11:59 PM PDT',
        weight: 0,
        grade: '--',
    },
];


export const courseData: Subject[] = [
  {
    id: 'subject-1',
    title: 'Frontend Development',
    learningObjective: 'Understand the core concepts of HTML, CSS, and JavaScript.',
    modules: [    
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
        id: 'module-3', // Keep module ids unique across all subjects if needed elsewhere
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
      {
        id: 'module-4', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 4: State Management with Redux Toolkit',
        learningObjectives: [
          'Understand the principles of Redux.',
          'Implement state management using Redux Toolkit.',
          'Connect Redux to a React application.',
        ],
        subModules: [
          { title: 'Introduction to Redux Concepts', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Using Redux Toolkit', type: 'epub', duration: 70, status: 'not-started' },
          { title: 'Integrating Redux with React', type: 'plugin', duration: 90, status: 'not-started' },
        ],
      },
      {
        id: 'module-5', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 5: Server-Side Rendering with Next.js',
        learningObjectives: [
          'Understand the benefits of Server-Side Rendering (SSR).',
          'Build a Next.js application.',
          'Implement data fetching in Next.js.',
        ],
        subModules: [
          { title: 'Introduction to Next.js and SSR', type: 'video', duration: 70, status: 'not-started' },
          { title: 'Building Pages and Routing in Next.js', type: 'epub', duration: 80, status: 'not-started' },
          { title: 'Data Fetching Strategies', type: 'plugin', duration: 100, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-2',
    title: 'Backend Development',
    modules: [  { 
        id: 'module-6',
        title: 'Module 6: Backend Development with Node.js and Express',
        learningObjectives: [
          'Learn the fundamentals of Node.js.',
          'Build a RESTful API using Express.js.',
          'Connect to a database.',
        ],
        subModules: [
          { title: 'Node.js Basics', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Building APIs with Express', type: 'epub', duration: 90, status: 'not-started' },
          { title: 'Database Integration (e.g., MongoDB)', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
      {
        id: 'module-7', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 7: Database Management',
        learningObjectives: [
          'Understand different database types (SQL vs. NoSQL).',
          'Learn basic database operations.',
          'Implement data modeling.',
        ],
        subModules: [
          { title: 'Introduction to Databases', type: 'video', duration: 50, status: 'not-started' },
          { title: 'SQL Database Fundamentals', type: 'epub', duration: 70, status: 'not-started' },
          { title: 'NoSQL Database Fundamentals (e.g., Mongoose)', type: 'plugin', duration: 80, status: 'not-started' },
        ],
      },
      {
        id: 'module-8', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 8: Authentication and Authorization',
        learningObjectives: [
          'Understand different authentication methods.',
          'Implement user authentication.',
          'Implement authorization and access control.',
        ],
        subModules: [
          { title: 'Introduction to Authentication', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Implementing User Authentication (e.g., JWT)', type: 'epub', duration: 90, status: 'not-started' },
          { title: 'Authorization and Access Control', type: 'plugin', duration: 80, status: 'not-started' },
        ],
      },
    ]
  },
  {
    id: 'subject-3',
    title: 'Advanced Topics and Career',
    modules: [   {
        id: 'module-9',
        title: 'Module 9: Testing Web Applications',
        learningObjectives: [
          'Understand different types of testing (unit, integration, end-to-end).',
          'Write unit tests for React components.',
          'Implement integration tests.',
        ],
        subModules: [
          { title: 'Introduction to Testing', type: 'video', duration: 50, status: 'not-started' },
          { title: 'Unit Testing with Jest and React Testing Library', type: 'epub', duration: 100, status: 'not-started' },
          { title: 'Integration Testing', type: 'plugin', duration: 70, status: 'not-started' },
        ],
      },
      {
        id: 'module-10', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 10: Deployment and DevOps',
        learningObjectives: [
          'Understand deployment strategies.',
          'Deploy a web application to a hosting provider.',
          'Learn about CI/CD pipelines.',
        ],
        subModules: [
          { title: 'Introduction to Deployment', type: 'video', duration: 40, status: 'not-started' },
          { title: 'Deploying to Vercel or Netlify', type: 'epub', duration: 60, status: 'not-started' },
          { title: 'Introduction to CI/CD', type: 'plugin', duration: 80, status: 'not-started' },
        ],
      },
      {
        id: 'module-11', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 11: Advanced Topics in Web Development',
        learningObjectives: [
          'Explore topics like WebSockets, GraphQL, and Serverless functions.',
          'Understand performance optimization techniques.',
          'Learn about web security best practices.',
        ],
        subModules: [
          { title: 'WebSockets and Real-time Applications', type: 'video', duration: 70, status: 'not-started' },
          { title: 'Introduction to GraphQL', type: 'epub', duration: 80, status: 'not-started' },
          { title: 'Performance Optimization', type: 'plugin', duration: 90, status: 'not-started' },
          { title: 'Web Security Fundamentals', type: 'video', duration: 60, status: 'not-started' },
        ],
      },
      {
        id: 'module-12', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 12: Final Project',
        learningObjectives: [
          'Apply all learned concepts to build a comprehensive web application.',
          'Demonstrate proficiency in frontend and backend development.',
          'Deploy the final project.',
        ],
        subModules: [
          { title: 'Project Requirements and Planning', type: 'epub', duration: 120, status: 'not-started' },
          { title: 'Building the Frontend', type: 'plugin', duration: 300, status: 'not-started' },
          { title: 'Building the Backend', type: 'plugin', duration: 300, status: 'not-started' },
          { title: 'Deployment and Presentation', type: 'video', duration: 180, status: 'not-started' },
        ],
      },
      {
        id: 'module-13', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 13: Career in Web Development',
        learningObjectives: [
          'Understand different career paths in web development.',
          'Learn how to build a strong portfolio.',
          'Prepare for technical interviews.',
        ],
        subModules: [
          { title: 'Web Development Career Paths', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Building Your Portfolio', type: 'epub', duration: 90, status: 'not-started' },
          { title: 'Technical Interview Preparation', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
      {
        id: 'module-14', // Keep module ids unique across all subjects if needed elsewhere
        title: 'Module 14: Staying Updated in Web Development',
        learningObjectives: [
          'Learn how to stay current with the latest web technologies.',
          'Explore resources for continuous learning.',
          'Understand the importance of community involvement.',
        ],
        subModules: [
          { title: 'Following Industry Trends', type: 'video', duration: 45, status: 'not-started' },
          { title: 'Online Resources for Learning', type: 'epub', duration: 60, status: 'not-started' },
          { title: 'The Role of Community', type: 'plugin', duration: 40, status: 'not-started' },
        ],
      },
    ]
  },
];
