import {
  Activity,
  Bell,
  Boxes,
  Braces,
  Cloud,
  Container,
  CreditCard,
  Database,
  FolderOpen,
  Gauge,
  GitBranch,
  KeyRound,
  Monitor,
  Network,
  Palette,
  Plug,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  TestTube,
  TrendingUp,
  Workflow,
  BarChart3,
  Brain,
  Flame,
  RadioTower,
  Globe,
  Cpu,
  Radio,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface SkillsRequiredProps {
  skills: ProjectResponse["skills_required"];
}

const skillIcons: Record<string, LucideIcon> = {
  "frontend development": Braces,
  "backend development": Server,
  "database design": Database,
  "database management": Database,
  "api development": Network,
  "rest api development": Network,
  "api integration": Network,
  authentication: KeyRound,
  authorization: ShieldCheck,
  "system design": Boxes,
  "software architecture": Boxes,
  "cloud deployment": Cloud,
  "cloud infrastructure": Cloud,
  devops: GitBranch,
  testing: TestTube,
  "unit testing": TestTube,
  "integration testing": TestTube,
  caching: Cloud,
  security: ShieldCheck,
  "data modeling": Database,
  "data processing": Workflow,
  "data analytics": BarChart3,
  "machine learning": Brain,
  "artificial intelligence": Brain,
  "file storage": FolderOpen,
  search: Search,
  "search and filtering": Search,
  notifications: Bell,
  "real time communication": Radio,
  "payment integration": CreditCard,
  "third party integration": Plug,
  "mobile development": Smartphone,
  "web development": Globe,
  "ui ux design": Palette,
  "responsive design": Monitor,
  "state management": Boxes,
  "performance optimization": Gauge,
  scalability: TrendingUp,
  "logging and monitoring": Activity,
  "version control": GitBranch,
  containerization: Container,
  "data visualization": BarChart3,
  "ai integration": Brain,
  "firebase integration": Flame,
  "iot development": RadioTower,
  "web application development": Globe,
  "embedded system": Cpu,
  "sensor integration": Radio,
};

const skillDescriptions: Record<string, string> = {
  "frontend development":
    "Build responsive interfaces and interactive user experiences.",

  "backend development":
    "Implement business logic, APIs, and application services.",

  "database design":
    "Design efficient data models and relationships for application data.",

  "database management":
    "Store, organize, query, and maintain persistent application data.",

  "api development":
    "Build APIs that allow different application components and services to communicate.",

  "rest api development":
    "Design and implement RESTful APIs for application communication.",

  "api integration": "Connect the application with external services and APIs.",

  authentication: "Implement secure user identity and login workflows.",

  authorization:
    "Control access to resources based on user permissions and roles.",

  "system design":
    "Design scalable architecture and interactions between application components.",

  "software architecture":
    "Structure application components for maintainability, scalability, and reliability.",

  "cloud deployment":
    "Deploy and maintain applications in cloud-based environments.",

  "cloud infrastructure":
    "Configure and manage scalable cloud infrastructure and services.",

  devops: "Automate development, deployment, and infrastructure workflows.",

  testing:
    "Validate application behavior and reduce defects through automated and manual testing.",

  "unit testing":
    "Test individual functions and components to ensure they behave correctly.",

  "integration testing":
    "Verify that multiple application components work correctly together.",

  caching:
    "Improve application performance by efficiently storing frequently accessed data.",

  security:
    "Protect application data, users, and services against security threats.",

  "data modeling":
    "Define structured data models and relationships for application requirements.",

  "data processing":
    "Transform, validate, and process application data efficiently.",

  "data analytics":
    "Analyze application data to generate useful insights and reports.",

  "machine learning":
    "Build systems that learn patterns from data to make predictions or decisions.",

  "artificial intelligence":
    "Integrate intelligent capabilities for automation, prediction, or decision-making.",

  "file storage":
    "Store, manage, and retrieve application files and uploaded resources.",

  search:
    "Implement efficient search functionality for finding relevant application data.",

  "search and filtering":
    "Allow users to quickly find and filter relevant information.",

  notifications:
    "Deliver timely updates, alerts, and messages to application users.",

  "real time communication":
    "Enable applications to exchange updates and data in real time.",

  "payment integration":
    "Integrate secure payment processing and transaction workflows.",

  "third party integration":
    "Connect the application with external platforms and services.",

  "mobile development":
    "Build applications and experiences optimized for mobile devices.",

  "web development":
    "Build modern web applications and browser-based experiences.",

  "ui ux design":
    "Design intuitive interfaces and user experiences around user needs.",

  "responsive design":
    "Create interfaces that adapt smoothly across different screen sizes.",

  "state management":
    "Manage and synchronize application state across components and user workflows.",

  "performance optimization":
    "Improve application speed, responsiveness, and resource efficiency.",

  scalability:
    "Design systems that can handle increasing users, traffic, and workloads.",

  "logging and monitoring":
    "Track application behavior, errors, and system health in production.",

  "version control":
    "Track code changes and collaborate safely across development workflows.",

  containerization:
    "Package applications and dependencies into consistent, portable environments.",

  "data visualization":
    "Transform application data into clear charts, graphs, and interactive visual reports.",

  "ai integration":
    "Integrate AI models and intelligent capabilities into application workflows.",

  "firebase integration":
    "Use Firebase services for authentication, databases, storage, messaging, and application infrastructure.",

  "iot development":
    "Build connected systems that collect, process, and exchange data between devices and applications.",

  "web application development":
    "Build scalable and responsive applications that run across modern web browsers.",

  "embedded system":
    "Develop software and hardware solutions for resource-constrained embedded devices.",

  "sensor integration":
    "Connect and process data from physical sensors within connected systems.",
};

export default function SkillsRequired({ skills }: SkillsRequiredProps) {
  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-400">
            Developer Skills
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Skills Required
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Technical skills that may be needed to successfully build the
            project.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const key = skill.toLowerCase();
            const Icon = skillIcons[key] ?? Braces;
            const description =
              skillDescriptions[key] ||
              "Technical expertise that may be required to successfully build and maintain this part of the project.";

            return (
              <div
                key={skill}
                className="glass-card p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-400/10">
                  <Icon className="h-5 w-5 text-purple-400" />
                </div>

                <h3 className="mt-4 font-semibold">{skill}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
