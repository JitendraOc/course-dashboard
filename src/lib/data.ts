
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
  {
    id: 'subject-4',
    title: 'Data Structures & Algorithms',
    learningObjective: 'Master fundamental data structures and algorithms for problem-solving.',
    modules: [
      {
        id: 'module-15',
        title: 'Module 1: Core Concepts',
        learningObjectives: ['Understand Big O notation.', 'Analyze time and space complexity.'],
        subModules: [
          { title: 'Introduction to Algorithms', type: 'video', duration: 45, status: 'not-started' },
          { title: 'Big O Notation', type: 'epub', duration: 60, status: 'not-started' },
          { title: 'Analyzing Complexity', type: 'plugin', duration: 75, status: 'not-started' },
        ],
      },
      {
        id: 'module-16',
        title: 'Module 2: Common Data Structures',
        learningObjectives: ['Implement arrays, linked lists, stacks, and queues.', 'Understand trees, graphs, and hash tables.'],
        subModules: [
          { title: 'Arrays and Linked Lists', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Stacks and Queues', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Trees and Graphs', type: 'epub', duration: 120, status: 'not-started' },
          { title: 'Hash Tables', type: 'plugin', duration: 90, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-5',
    title: 'UI/UX Design Principles',
    learningObjective: 'Learn the fundamentals of creating intuitive and beautiful user interfaces.',
    modules: [
      {
        id: 'module-17',
        title: 'Module 1: Introduction to UI/UX',
        learningObjectives: ['Define UI and UX.', 'Understand the user-centered design process.'],
        subModules: [
          { title: 'What is UI/UX?', type: 'video', duration: 30, status: 'not-started' },
          { title: 'The Design Thinking Process', type: 'epub', duration: 60, status: 'not-started' },
        ],
      },
      {
        id: 'module-18',
        title: 'Module 2: Core Principles',
        learningObjectives: ['Learn about visual hierarchy, color theory, and typography.', 'Apply principles of layout and composition.'],
        subModules: [
          { title: 'Visual Hierarchy & Layout', type: 'video', duration: 75, status: 'not-started' },
          { title: 'Color Theory', type: 'epub', duration: 45, status: 'not-started' },
          { title: 'Typography', type: 'plugin', duration: 60, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-6',
    title: 'Mobile App Development',
    learningObjective: 'Build cross-platform mobile apps with React Native.',
    modules: [
      {
        id: 'module-19',
        title: 'Module 1: React Native Basics',
        learningObjectives: ['Set up a React Native development environment.', 'Understand core components and styling.'],
        subModules: [
          { title: 'Setting Up Your Environment', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Core Components', type: 'epub', duration: 90, status: 'not-started' },
          { title: 'Styling in React Native', type: 'plugin', duration: 75, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-7',
    title: 'Cloud Computing & DevOps',
    learningObjective: 'Learn to deploy and manage applications on AWS and implement CI/CD pipelines.',
    modules: [
      {
        id: 'module-20',
        title: 'Module 1: Introduction to Cloud',
        learningObjectives: ['Understand cloud service models (IaaS, PaaS, SaaS).', 'Get familiar with the AWS console.'],
        subModules: [
          { title: 'What is Cloud Computing?', type: 'video', duration: 45, status: 'not-started' },
          { title: 'Introduction to AWS', type: 'epub', duration: 75, status: 'not-started' },
        ],
      },
      {
        id: 'module-21',
        title: 'Module 2: CI/CD with GitHub Actions',
        learningObjectives: ['Automate your build, test, and deployment process.'],
        subModules: [
          { title: 'Intro to Continuous Integration', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Building a Pipeline with GitHub Actions', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-8',
    title: 'Cybersecurity Fundamentals',
    learningObjective: 'Understand common web vulnerabilities and how to prevent them.',
    modules: [
      {
        id: 'module-22',
        title: 'Module 1: Web Security Basics',
        learningObjectives: ['Learn about the OWASP Top 10.', 'Understand Cross-Site Scripting (XSS) and SQL Injection.'],
        subModules: [
          { title: 'OWASP Top 10', type: 'video', duration: 90, status: 'not-started' },
          { title: 'Preventing XSS', type: 'epub', duration: 60, status: 'not-started' },
          { title: 'Preventing SQL Injection', type: 'plugin', duration: 60, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-9',
    title: 'Python for Web Developers',
    learningObjective: 'Learn Python and the Django framework for backend development.',
    modules: [
      {
        id: 'module-23',
        title: 'Module 1: Python Fundamentals',
        learningObjectives: ['Learn Python syntax, data types, and control flow.'],
        subModules: [
          { title: 'Introduction to Python', type: 'video', duration: 90, status: 'not-started' },
          { title: 'Data Structures in Python', type: 'epub', duration: 75, status: 'not-started' },
        ],
      },
      {
        id: 'module-24',
        title: 'Module 2: Web Development with Django',
        learningObjectives: ['Build a web application using the Django framework.'],
        subModules: [
          { title: 'Getting Started with Django', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Models, Views, and Templates', type: 'plugin', duration: 150, status: 'not-started' },
        ],
      },
    ],
  },
    {
    id: 'subject-10',
    title: 'Machine Learning Foundations',
    learningObjective: 'Grasp the basic concepts of machine learning and its applications.',
    modules: [
      {
        id: 'module-25',
        title: 'Module 1: Introduction to ML',
        learningObjectives: ['Understand the types of machine learning.', 'Explore real-world applications.'],
        subModules: [
          { title: 'What is Machine Learning?', type: 'video', duration: 45, status: 'not-started' },
          { title: 'Supervised vs. Unsupervised Learning', type: 'epub', duration: 60, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-11',
    title: 'Data Science & Analytics',
    learningObjective: 'Learn to extract insights from data using Python libraries.',
    modules: [
      {
        id: 'module-26',
        title: 'Module 1: Data Analysis with Pandas',
        learningObjectives: ['Learn to manipulate and analyze data using the Pandas library.'],
        subModules: [
          { title: 'Introduction to Pandas DataFrames', type: 'video', duration: 90, status: 'not-started' },
          { title: 'Data Cleaning and Preparation', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-12',
    title: 'Project Management for Tech',
    learningObjective: 'Learn Agile and Scrum methodologies for managing software projects.',
    modules: [
      {
        id: 'module-27',
        title: 'Module 1: Agile Methodologies',
        learningObjectives: ['Understand the Agile Manifesto.', 'Learn the Scrum framework.'],
        subModules: [
          { title: 'Introduction to Agile', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Scrum Roles and Ceremonies', type: 'epub', duration: 90, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-13',
    title: 'API Design and Development',
    learningObjective: 'Master the art of designing, building, and documenting RESTful APIs.',
    modules: [
      {
        id: 'module-28',
        title: 'Module 1: RESTful API Principles',
        learningObjectives: ['Understand the principles of REST.', 'Learn about HTTP methods and status codes.'],
        subModules: [
          { title: 'What is a RESTful API?', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Designing API Endpoints', type: 'epub', duration: 75, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-14',
    title: 'Web Accessibility (WCAG)',
    learningObjective: 'Build web applications that are usable by people with disabilities.',
    modules: [
      {
        id: 'module-29',
        title: 'Module 1: Introduction to Accessibility',
        learningObjectives: ['Understand the importance of web accessibility.', 'Learn the WCAG guidelines.'],
        subModules: [
          { title: 'Why Accessibility Matters', type: 'video', duration: 45, status: 'not-started' },
          { title: 'Introduction to WCAG', type: 'epub', duration: 90, status: 'not-started' },
          { title: 'Semantic HTML for Accessibility', type: 'plugin', duration: 60, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-15',
    title: 'Blockchain and Web3',
    learningObjective: 'Explore the fundamentals of blockchain technology and decentralized applications.',
    modules: [
      {
        id: 'module-30',
        title: 'Module 1: Blockchain Basics',
        learningObjectives: ['Understand how blockchain works.', 'Learn about cryptocurrencies like Bitcoin and Ethereum.'],
        subModules: [
          { title: 'Introduction to Blockchain', type: 'video', duration: 75, status: 'not-started' },
          { title: 'Smart Contracts with Solidity', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-16',
    title: 'Game Development with JavaScript',
    learningObjective: 'Create simple web-based games using JavaScript and HTML5 Canvas.',
    modules: [
      {
        id: 'module-31',
        title: 'Module 1: HTML5 Canvas',
        learningObjectives: ['Learn to draw shapes, text, and images on the HTML5 Canvas.'],
        subModules: [
          { title: 'Introduction to Canvas', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Game Loop and Animation', type: 'plugin', duration: 90, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-17',
    title: 'Technical Writing & Documentation',
    learningObjective: 'Learn to write clear and concise technical documentation.',
    modules: [
      {
        id: 'module-32',
        title: 'Module 1: Effective Documentation',
        learningObjectives: ['Understand the principles of good documentation.', 'Learn to write for different audiences.'],
        subModules: [
          { title: 'Writing Clear Technical Docs', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Documenting APIs', type: 'epub', duration: 75, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-18',
    title: 'Freelancing for Developers',
    learningObjective: 'Learn the business side of being a freelance developer.',
    modules: [
      {
        id: 'module-33',
        title: 'Module 1: Starting Your Business',
        learningObjectives: ['Learn how to find clients.', 'Understand pricing, proposals, and contracts.'],
        subModules: [
          { title: 'Finding Your First Clients', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Pricing and Contracts', type: 'epub', duration: 75, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-19',
    title: 'Go (Golang) for Backend',
    learningObjective: 'Learn the Go programming language for building high-performance backend systems.',
    modules: [
      {
        id: 'module-34',
        title: 'Module 1: Go Fundamentals',
        learningObjectives: ['Learn Go syntax, concurrency, and standard library.'],
        subModules: [
          { title: 'Introduction to Go', type: 'video', duration: 90, status: 'not-started' },
          { title: 'Concurrency in Go', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-20',
    title: 'Rust for Performance',
    learningObjective: 'Learn Rust for systems programming and performance-critical applications.',
    modules: [
      {
        id: 'module-35',
        title: 'Module 1: Rust Basics',
        learningObjectives: ['Understand ownership, borrowing, and lifetimes.', 'Learn Rust syntax and data types.'],
        subModules: [
          { title: 'Introduction to Rust', type: 'video', duration: 120, status: 'not-started' },
          { title: 'Ownership and Lifetimes', type: 'epub', duration: 90, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-21',
    title: 'C# and .NET',
    learningObjective: 'Build enterprise-level applications with C# and the .NET framework.',
    modules: [
      {
        id: 'module-36',
        title: 'Module 1: C# and .NET Core',
        learningObjectives: ['Learn C# fundamentals.', 'Build a web API with ASP.NET Core.'],
        subModules: [
          { title: 'Introduction to C#', type: 'video', duration: 90, status: 'not-started' },
          { title: 'Building Web APIs with ASP.NET', type: 'plugin', duration: 150, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-22',
    title: 'GraphQL',
    learningObjective: 'Learn GraphQL to build more efficient and flexible APIs.',
    modules: [
      {
        id: 'module-37',
        title: 'Module 1: GraphQL Fundamentals',
        learningObjectives: ['Understand the differences between REST and GraphQL.', 'Write GraphQL schemas and queries.'],
        subModules: [
          { title: 'Introduction to GraphQL', type: 'video', duration: 75, status: 'not-started' },
          { title: 'Building a GraphQL Server', type: 'plugin', duration: 120, status: 'not-started' },
        ],
      },
    ],
  },
  {
    id: 'subject-23',
    title: 'Advanced JavaScript',
    learningObjective: 'Deepen your understanding of JavaScript with advanced concepts.',
    modules: [
      {
        id: 'module-38',
        title: 'Module 1: Core Concepts Revisited',
        learningObjectives: ['Understand closures, prototypes, and asynchronous JavaScript in depth.'],
        subModules: [
          { title: 'Closures and Scope', type: 'video', duration: 60, status: 'not-started' },
          { title: 'Prototypes and Inheritance', type: 'epub', duration: 75, status: 'not-started' },
          { title: 'Async/Await and Promises', type: 'plugin', duration: 90, status: 'not-started' },
        ],
      },
    ],
  },
];
