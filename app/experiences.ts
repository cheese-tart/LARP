type Experience = {
  name: string;
  jobTitle?: string;
  companyUrl: string;
  period: string;
  location?: string;
  className: string;
  logo: { src: string; width: number; height: number };
  detail: string;
  tags: string;
};

export const experiences: readonly Experience[] = [
  {
    name: "RBC",
    jobTitle: "Software Engineer Intern",
    companyUrl: "https://www.rbc.com/",
    period: "Incoming Winter 2027",
    location: "Toronto, ON",
    className: "rbc",
    logo: { src: "/rbc-shield.svg", width: 35, height: 46 },
    detail: "Joining RBC's AI Group.",
    tags: "TBD",
  },
];
