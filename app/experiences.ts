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
    name: "Girls Who LEAP",
    jobTitle: "Mobile App Developer",
    companyUrl: "https://www.girlswholeap.com/",
    period: "Summer 2026",
    location: "Vancouver, BC",
    className: "girls-who-leap",
    logo: { src: "/girls-who-leap-logo.svg", width: 244, height: 206 },
    detail: "Portable communication platform.",
    tags: "TypeScript, Supabase, React Native, PostgreSQL",
  },
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
