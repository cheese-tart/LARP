import type { ComponentProps } from "react";
import type { Icon } from "./components/portfolio-icon";

type ProjectIcon =
  | { className?: ComponentProps<typeof Icon>["name"]; logo?: never }
  | { className: string; logo: { src: string; width: number; height: number } };

type Project = {
  name: string;
  detail: string;
  tags: string;
  githubUrl?: string;
} & ProjectIcon;

export const projects: readonly Project[] = [
  {
    name: "NESulator",
    githubUrl: "https://github.com/cheese-tart/NESulator",
    className: "nintendo",
    logo: { src: "/nintendo-wordmark.svg", width: 103, height: 26 },
    detail: "Nintendo Entertainment System emulator in C++, runs on Unreal Engine - emulates the 6502 instruction set in software.",
    tags: "C++ · Unreal Engine",
  },
  {
    name: "Spam or Ham?",
    githubUrl: "https://github.com/cheese-tart/New-folder",
    className: "spam-or-ham",
    logo: { src: "/spam-or-ham.png", width: 216, height: 216 },
    detail: "Text classification pipeline with scikit-learn for email and SMS spam detection, containerized with Docker and deployed on AWS.",
    tags: "Python · FastAPI · scikit-learn · TypeScript · React · Docker · AWS",
  }
];

type SchoolProject = {
  name: string;
  detail?: string | readonly (string | { text: string; url: string })[];
  githubUrl: string;
  tags: string;
} & ProjectIcon;

export const schoolProjectsIntro = "Uninspired and soulless. Done for the sake of grades. Still a decent showcase of my skills I guess.";

export const schoolProjects: readonly SchoolProject[] = [
  {
    name: "Workout Logger",
    githubUrl: "https://github.com/cheese-tart/Workout-Logger",
    className: "dumbbell",
    detail: "Desktop application for logging exercises done in a workout. Application of OOP principles and software development practices taught in CPSC 210.",
    tags: "Java · JUnit · Swing",
  },
  {
    name: "Take a Hike",
    githubUrl: "https://github.com/cheese-tart/Take-a-Hike",
    className: "mountain",
    detail: "Essentially a mini Strava clone. Application of relational database theory taught in CPSC 304.",
    tags: "JavaScript · SQL · Node.js · Express.js · OracleDB",
  },
  {
    name: "UBC Course Insights",
    githubUrl: "https://github.com/cheese-tart/UBC-Course-Insights",
    className: "graduation-cap",
    detail: [
      "Provides insights from historical UBC course data through asynchronous data pipelines and a custom query language. Application of software engineering theory taught in CPSC 310. Built with a really cool guy named ",
      { text: "Draco", url: "https://ca.linkedin.com/in/dracofs" },
      ".",
    ],
    tags: "TypeScript · React · Node.js · Express.js · Mocha · Chai",
  }
];
