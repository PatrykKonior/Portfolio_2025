const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Services",
    link: "#services",
  },
];

const contactInfo = {
  email: "patrykkonior4@gmail.com",
  linkedin: "https://www.linkedin.com/in/patrykkonior/",
  github: "https://github.com/PatrykKonior",
  location: "Chorzów, Poland",
  workMode: "Remote or on-site",
  languages: "English B2/C1 · German A2",
};

const heroCopy = {
  eyebrow: "Full-stack Developer — Portfolio ©2026",
  title: "Building <em>web apps</em> from database to&nbsp;pixel.",
  intro: "Hi, I'm Patryk. I design and ship production software with React, Svelte, Elixir, Node.js and .NET, and I talk directly with the people who use it.",
  availability: "Available for new projects",
};

const aboutText =
  "I take features all the way from database schema and real-time APIs to a polished interface, then ship them with Docker and CI/CD. Three years of commercial work across Elixir, Node.js and .NET taught me that great software is equal parts clean code and clear conversations with clients.";

const counterItems = [
  { value: 3, suffix: "+", label: "Years of Commercial Experience" },
  { value: 3, suffix: "", label: "Backend Ecosystems: Elixir, Node.js & .NET" },
  { value: 3, suffix: "", label: "Frontend Frameworks: React, Svelte & LiveView" },
  { value: 45, suffix: "+", label: "Technologies & Tools Used" },
];

const logoIconsList = [
  { name: "Elixir", imgPath: "/images/tech/elixir.svg" },
  { name: "Phoenix", imgPath: "/images/tech/phoenix.svg" },
  { name: "React", imgPath: "/images/tech/react.svg" },
  { name: "TypeScript", imgPath: "/images/tech/typescript.svg" },
  { name: "Svelte", imgPath: "/images/tech/svelte.svg" },
  { name: "Node.js", imgPath: "/images/tech/nodejs.svg" },
  { name: "C#", imgPath: "/images/tech/csharp.svg" },
  { name: ".NET", imgPath: "/images/tech/dotnet.svg" },
  { name: "PostgreSQL", imgPath: "/images/tech/postgresql.svg" },
  { name: "SQL Server", imgPath: "/images/tech/microsoftsqlserver.svg" },
  { name: "Docker", imgPath: "/images/tech/docker.svg" },
  { name: "Tailwind CSS", imgPath: "/images/tech/tailwindcss.svg" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Full-stack Ownership",
    desc: "I take features all the way from database design and APIs to a polished, responsive interface.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Direct Client Communication",
    desc: "I run meetings, gather requirements and handle support tickets myself, so nothing gets lost between business and code.",
  },
  {
    imgPath: "/images/time.png",
    title: "Production-Ready Delivery",
    desc: "Tested code, Docker deployments and CI/CD pipelines, so new features reach production safely.",
  },
];

const projects = [
  {
    title: "Design Office Management Suite",
    year: "Desktop · Web · Mobile",
    desc: "A system for running a design office: clients, projects, invoices, payments, tasks and time tracking. One .NET Core REST API serves three apps: a web app and a mobile app built from a single React Native (Expo) codebase, and a WPF desktop app built with MVVM.",
    tags: ["C#", ".NET Core", "Entity Framework", "WPF / MVVM", "React Native", "Expo", "TypeScript", "SQL Server"],
    architecture: {
      clients: [
        { name: "Web app", detail: "React Native Web", icon: "/images/tech/react.svg" },
        { name: "Mobile app", detail: "React Native", icon: "/images/tech/react.svg" },
        { name: "Desktop app", detail: "WPF / MVVM", icon: "/images/tech/csharp.svg" },
      ],
      server: { name: ".NET Core", detail: "REST API", icon: "/images/tech/dotnet.svg" },
      database: { name: "SQL Server", detail: "Entity Framework", icon: "/images/tech/microsoftsqlserver.svg" },
    },
    links: [
      { label: "API", url: "https://github.com/PatrykKonior/MVVM_REST_API_CRUD" },
      { label: "Web & Mobile", url: "https://github.com/PatrykKonior/ReacNative_MVVM_Company" },
      { label: "Desktop", url: "https://github.com/PatrykKonior/MVVM_Office" },
    ],
  },
  {
    title: "Pizza Restaurant Admin Dashboard",
    year: "Web dashboard",
    desc: "A React dashboard for managing the menu, orders, inventory, staff schedules and documents, backed by a .NET REST API.",
    tags: ["React", "React Router", "Bootstrap", "C#", ".NET Core", "SQL Server"],
    architecture: {
      clients: [{ name: "Web app", detail: "React", icon: "/images/tech/react.svg" }],
      server: { name: ".NET Core", detail: "REST API", icon: "/images/tech/dotnet.svg" },
      database: { name: "SQL Server", detail: "Entity Framework", icon: "/images/tech/microsoftsqlserver.svg" },
    },
    links: [
      { label: "Frontend", url: "https://github.com/PatrykKonior/ReactAppPizza_Studia" },
      { label: "API", url: "https://github.com/PatrykKonior/MVVM_PIZZA_REST_API_CRUD" },
    ],
  },
  {
    title: "Pento: Phoenix LiveView Store",
    year: "Real-time store",
    desc: "An online store built with Phoenix LiveView. Users sign up, browse and search products by SKU, rate them and fill in a demographic survey. The admin dashboard turns ratings into interactive charts filtered by age group and gender, all without page reloads.",
    tags: ["Elixir", "Phoenix", "LiveView", "Ecto", "PostgreSQL"],
    architecture: {
      clients: [{ name: "LiveView", detail: "Real-time UI", icon: "/images/tech/phoenix.svg" }],
      server: { name: "Phoenix", detail: "Elixir / OTP", icon: "/images/tech/elixir.svg" },
      database: { name: "PostgreSQL", detail: "Ecto", icon: "/images/tech/postgresql.svg" },
    },
    links: [{ label: "Code", url: "https://github.com/PatrykKonior/PENTO_APPS" }],
  },
];

const services = [
  {
    title: "Web Applications",
    points: ["Figma to production", "CRMs & internal tools", "Responsive, accessible UI"],
    desc: "Custom web apps, CRMs and internal tools built with React, Svelte or Phoenix LiveView, from the first Figma sketch to production.",
    icons: ["/images/tech/react.svg", "/images/tech/svelte.svg", "/images/tech/phoenix.svg"],
  },
  {
    title: "Backend & Real-time APIs",
    points: ["REST & WebSockets", "Auth with JWT / OAuth", "SQL & NoSQL data models"],
    desc: "REST APIs and live features over WebSockets, built with Elixir, Node.js or .NET on top of PostgreSQL, SQL Server or MongoDB.",
    icons: ["/images/tech/elixir.svg", "/images/tech/nodejs.svg", "/images/tech/dotnet.svg"],
  },
  {
    title: "Deployment & DevOps",
    points: ["Docker & Nginx", "CI/CD pipelines", "Linux servers & S3"],
    desc: "Dockerized apps served by Nginx on Linux servers, automated CI/CD pipelines and file storage on Amazon S3.",
    icons: ["/images/tech/docker.svg", "/images/tech/linux.svg", "/images/tech/git.svg"],
  },
  {
    title: "Performance & SEO",
    points: ["Core Web Vitals", "Semantic structure", "Accessibility audits"],
    desc: "Faster pages, better accessibility and a clean structure that search engines understand.",
    icons: ["/images/tech/html5.svg", "/images/tech/tailwindcss.svg", "/images/tech/typescript.svg"],
  },
];

const expCards = [
  {
    company: "LTR Labs sp. z o.o.",
    logoText: "LTR",
    summary: "Developing and maintaining three products in parallel: an EdTech learning platform, a CRM system and an internal company tool.",
    title: "Full-stack Developer",
    period: "2026 — Now",
    date: "January 2026 – Present · Remote",
    responsibilities: [
      "Building web interfaces in TypeScript, JavaScript and Svelte with Tailwind CSS, on an Elixir / Phoenix LiveView backend.",
      "Designing and implementing REST APIs and real-time communication over WebSockets.",
      "Containerizing and deploying to production with Docker, Nginx and Linux, with automated CI/CD and file storage on S3.",
      "Optimizing applications for SEO: structure, performance and accessibility.",
      "Working directly with clients: running meetings, gathering requirements and handling support tickets.",
    ],
    stack: ["Elixir", "Phoenix", "LiveView", "Ecto", "Oban", "OTP / GenServer", "TypeScript", "JavaScript", "Svelte", "Tailwind CSS", "PostgreSQL", "Docker", "Nginx", "Linux", "S3", "CI/CD"],
  },
  {
    company: "Medas sp. z o.o.",
    logoText: "M",
    summary: "Promoted after a year on the frontend to take ownership of features across the whole stack.",
    title: "Junior Fullstack Developer",
    period: "2025",
    date: "March 2025 – December 2025 · Hybrid",
    responsibilities: [
      "Building REST APIs secured with JWT and OAuth, backed by Microsoft SQL Server and MongoDB.",
      "Writing automation and integration scripts in T-SQL, Python and PowerShell.",
      "Refactoring and optimizing existing code and application logic.",
    ],
    stack: ["Node.js", "Express.js", "TypeScript", "REST API", "JWT / OAuth", "SQL Server", "T-SQL", "MongoDB", "Python", "PowerShell", "Windows Server", "Jest", "React Testing Library"],
  },
  {
    company: "Medas sp. z o.o.",
    logoText: "M",
    summary: "Started my commercial career building web applications for clients in React.",
    title: "Junior Frontend Developer",
    period: "2024 — 2025",
    date: "March 2024 – March 2025 · On-site",
    responsibilities: [
      "Building and maintaining web applications in React with JavaScript and TypeScript.",
      "Gathering requirements with clients and designing new applications from scratch in Figma.",
      "Creating responsive interfaces with Tailwind CSS and bundling them with Webpack.",
    ],
    stack: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "CSS", "Webpack", "Figma", "GitHub"],
  },
];

export {
  heroCopy,
  aboutText,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  projects,
  services,
  contactInfo,
  navLinks,
};
