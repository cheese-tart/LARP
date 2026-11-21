import type { ComponentProps } from "react";
import type { Icon } from "./components/portfolio-icon";

type Project = {
  name: string;
  detail: string;
  tags: string;
  githubUrl?: string;
} & (
  | { className: ComponentProps<typeof Icon>["name"]; logo?: never }
  | { className: string; logo: { src: string; width: number; height: number } }
);

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
  detail?: string;
  githubUrl: string;
};

export const schoolProjectsIntro = "Uninspired and soulless. Done for the sake of grades. Still a decent showcase of my skills I guess.";

export const schoolProjects: readonly SchoolProject[] = [];
