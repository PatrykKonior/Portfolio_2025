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
  title: "Building <em>apps</em> from database to&nbsp;pixel.",
  intro: "Hi, I'm Patryk. I design and ship production software with React, Svelte, Elixir, Node.js and .NET, and I talk directly with the people who use it.",
  availability: "Available for new projects",
};

const aboutText =
  "I take features all the way from database schema and real-time APIs to a polished interface, then ship them with Docker and CI/CD. Three years of commercial work across Elixir, Node.js and .NET taught me that great software is equal parts clean code and clear conversations with clients.";

const counterItems = [
  { value: 3, suffix: "+", label: "Years of experience", detail: "Commercial projects" },
  { value: 3, suffix: "", label: "Backend ecosystems", detail: "Elixir · Node.js · .NET" },
  { value: 3, suffix: "", label: "Frontend frameworks", detail: "React · Svelte · LiveView" },
  { value: 45, suffix: "+", label: "Technologies & tools", detail: "And counting" },
];

const logoIconsList = [
  { name: "Elixir", imgPath: "/images/tech/elixir.svg" },
  { name: "Phoenix", imgPath: "/images/tech/phoenix.svg" },
  { name: "React", imgPath: "/images/tech/react.svg" },
  { name: "TypeScript", imgPath: "/images/tech/typescript.svg" },
  { name: "Svelte", imgPath: "/images/tech/svelte.svg" },
  { name: "Node.js", imgPath: "/images/tech/nodejs.svg" },
  { name: "Python", imgPath: "/images/tech/python.svg" },
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
    tint: "linear-gradient(135deg, #c9d6ff 0%, #f6d4ff 100%)",
    year: "Desktop · Web · Mobile",
    desc: "One system that runs an entire design office: clients, projects, invoices, payments, tasks and time tracking in a single place. The team works wherever it suits them, in a WPF desktop app, in the browser or on the phone, and every app stays in sync through one .NET Core REST API. The web and mobile apps share a single codebase, so new features reach every platform at once.",
    tags: ["C#", ".NET Core", "Entity Framework", "WPF / MVVM", "React Native", "Expo", "TypeScript", "SQL Server"],
    architecture: {
      clients: [
        { name: "Web app", detail: "React", icon: "/images/tech/react.svg" },
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
    title: "Pizzeria Management Panel & Storefront",
    tint: "linear-gradient(135deg, #ffe0c2 0%, #ffd1dc 100%)",
    year: "Admin panel · Storefront",
    desc: "A complete digital back office for a multi-location pizzeria, paired with a modern storefront for its customers. The React admin panel brings sales, stock, staff schedules, documents, recipes and per-location revenue reports into one clear dashboard, all powered by a .NET REST API on SQL Server.",
    tags: ["React", "React Router", "Bootstrap", "C#", ".NET Core", "SQL Server"],
    architecture: {
      clients: [
        { name: "Admin panel", detail: "React", icon: "/images/tech/react.svg" },
        { name: "Storefront", detail: "React", icon: "/images/tech/react.svg" },
      ],
      server: { name: ".NET Core", detail: "REST API", icon: "/images/tech/dotnet.svg" },
      database: { name: "SQL Server", detail: "Entity Framework", icon: "/images/tech/microsoftsqlserver.svg" },
    },
    links: [
      { label: "Admin panel", url: "https://github.com/PatrykKonior/ReactAppPizza_Studia" },
      { label: "API", url: "https://github.com/PatrykKonior/MVVM_PIZZA_REST_API_CRUD" },
    ],
  },
  {
    title: "Pento: Real-time Store on Phoenix LiveView",
    tint: "linear-gradient(135deg, #d5f5e3 0%, #c8e1ff 100%)",
    year: "Real-time store",
    desc: "A real-time online store built with Phoenix LiveView. Customers find products fast, rate them and share their feedback, while the owner gets an analytics dashboard that turns that data into interactive charts by customer segment. Everything updates live, with no page reloads and no separate JavaScript front end to maintain.",
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
    desc: "REST APIs, microservices and live features over WebSockets, built with Elixir, Node.js or .NET on top of PostgreSQL, SQL Server or MongoDB, plus automation scripts in Python.",
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
    summary: "Promoted after a year on the frontend to own features across the whole stack and lead three projects.",
    title: "Junior Fullstack Developer",
    period: "2025",
    date: "March 2025 – December 2025 · Hybrid",
    responsibilities: [
      "Leading three projects end to end: running their development, delivering fixes and improvements, and agreeing changes directly with the client.",
      "Building and maintaining microservices in Node.js and Express.",
      "Building REST APIs secured with JWT and OAuth, backed by Microsoft SQL Server and MongoDB.",
      "Writing automation and integration scripts in T-SQL, Python and PowerShell.",
      "Refactoring and optimizing existing code and application logic.",
    ],
    stack: ["Node.js", "Express.js", "Microservices", "TypeScript", "REST API", "JWT / OAuth", "SQL Server", "T-SQL", "MongoDB", "Python", "PowerShell", "Windows Server", "Linux", "Nginx", "GitHub", "Jest", "React Testing Library"],
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
