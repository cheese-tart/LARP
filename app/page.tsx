"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type UIEvent } from "react";
import { Icon } from "./components/portfolio-icon";
import { SidebarScrollbar } from "./components/sidebar-scrollbar";
import { experiences } from "./experiences";
import { projects, schoolProjects, schoolProjectsIntro } from "./projects";

const shortcuts = [
  { screen: "Overview", label: "Overview", icon: "grid", color: "home" },
  { screen: "Experience", label: "Experience", icon: "briefcase", color: "experience" },
  { screen: "Projects", label: "All projects", sidebarLabel: "Projects", icon: "wrench", color: "projects" },
  { screen: "About", label: "About", icon: "user", color: "profile" },
  { screen: "Contact", label: "Contact", icon: "mail", color: "contact" },
] as const;

const schoolProjectsTile = {
  screen: "School Projects",
  label: "School Projects",
  className: "ubc",
  logo: { src: "/ubc-crest.png", width: 413, height: 563 },
} as const;

type Section = "Home" | (typeof shortcuts)[number]["screen"] | typeof schoolProjectsTile.screen;
type PortfolioEntry = (typeof projects)[number] | (typeof schoolProjects)[number] | (typeof experiences)[number];

function experienceLocation(entry: (typeof experiences)[number]) {
  return entry.location?.trim() || "Location TBD";
}

function EntryIcon({ entry, size }: { entry: PortfolioEntry | typeof schoolProjectsTile; size: number }) {
  return (
    <span className={`app-icon ${entry.className ?? "tools"}`}>
      {entry.logo
        ? <Image className="entry-logo" {...entry.logo} alt="" unoptimized />
        : <Icon name={entry.className ?? "tools"} size={size} />}
    </span>
  );
}

function EntryLink({ name, url }: { name: string; url?: string }) {
  return url ? (
    <a className="entry-link" href={url} target="_blank" rel="noopener noreferrer">{name}</a>
  ) : name;
}

const entriesBySection: Partial<Record<Section, readonly PortfolioEntry[]>> = {
  Projects: projects,
  Experience: [...experiences].reverse(),
};

const projectTiles = [...[...projects].reverse(), schoolProjectsTile];
const schoolProjectTiles = [...schoolProjects].reverse();

const overviewTiles = [
  ...Object.values(entriesBySection).flat(),
  ...shortcuts.filter((item) => item.screen !== "Overview"),
  schoolProjectsTile,
].sort((a, b) => {
  const firstLabel = "label" in a ? a.label : a.name;
  const secondLabel = "label" in b ? b.label : b.name;
  return firstLabel.localeCompare(secondLabel, "en");
});

export default function Home() {
  const [screen, setScreen] = useState<Section>("Home");
  const [schoolProjectsOrigin, setSchoolProjectsOrigin] = useState<"Overview" | "Projects">("Projects");
  const [mode, setMode] = useState<"Comfort" | "Sport">("Sport");
  const [clock, setClock] = useState({ digits: "--:--", period: "" });
  const [selected, setSelected] = useState<PortfolioEntry | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sideNavRef = useRef<HTMLElement>(null);
  const scrollbarTimers = useRef(new Map<HTMLElement, number>());
  const tiles = screen === "Overview" ? overviewTiles
    : screen === "Projects" ? projectTiles
    : screen === "School Projects" ? schoolProjectTiles
    : entriesBySection[screen];
  const activeSidebarScreen = screen === "School Projects" ? schoolProjectsOrigin : screen;
  const projectGitHubUrl = selected && "githubUrl" in selected ? selected.githubUrl : undefined;
  const selectedExperience = selected && "period" in selected ? selected : undefined;
  const jobTitle = selectedExperience?.jobTitle?.trim();
  const experienceDetails = selectedExperience
    ? [selectedExperience.period, experienceLocation(selectedExperience)].filter(Boolean).join(" · ")
    : "";

  function showScrollbar(event: UIEvent<HTMLElement>) {
    const pane = event.currentTarget;
    const timers = scrollbarTimers.current;
    pane.setAttribute("data-scrolling", "");
    window.clearTimeout(timers.get(pane));
    timers.set(pane, window.setTimeout(() => {
      pane.removeAttribute("data-scrolling");
      timers.delete(pane);
    }, 400));
  }

  useEffect(() => {
    const timers = scrollbarTimers.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    const tick = () => {
      const parts = formatter.formatToParts(new Date());
      const hour = parts.find((part) => part.type === "hour")?.value;
      const minute = parts.find((part) => part.type === "minute")?.value;
      const period = parts.find((part) => part.type === "dayPeriod")?.value;
      setClock({ digits: `${hour}:${minute}`, period: period?.toLowerCase() ?? "" });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selected && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [selected]);

  return (
    <main className="portfolio" data-mode={mode}>
      <div className="console">
        <header className="status-bar">
          <div className="status-strip">
            <div className="status-links">
              <a className="status-icon" href="https://github.com/cheese-tart/"
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub repository" title="GitHub repository">
                <Icon name="github" size={17} />
              </a>
              <a
                className="status-icon"
                href="https://www.linkedin.com/in/wong-chester/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={17} />
              </a>
              <a
                className="status-icon"
                href="/larpsume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Résumé PDF (opens in a new tab)"
              >
                <Icon name="resume" size={17} />
              </a>
            </div>
            <time className="status-clock">
              {clock.digits}{clock.period && <span className="clock-period"> {clock.period}</span>}
            </time>
            <button className="display-toggle" aria-label={`Sport display mode, ${mode === "Sport" ? "on" : "off"}`}
              aria-pressed={mode === "Sport"}
              onClick={() => setMode((current) => current === "Comfort" ? "Sport" : "Comfort")}>
              <Icon name={mode === "Sport" ? "sport" : "comfort"} size={19} />
              <span>{mode}</span>
            </button>
          </div>
        </header>

        <aside className="side-rail">
          <strong className="identity" lang="zh-Hant">黃</strong>
          <nav ref={sideNavRef} className="side-nav" aria-label="Portfolio sections" onScroll={showScrollbar}>
            {shortcuts.map((item) => (
              <button key={item.screen} aria-current={activeSidebarScreen === item.screen ? "page" : undefined}
                onClick={() => setScreen(item.screen)}>
                <Icon name={item.icon} size={21} />
                <span>{"sidebarLabel" in item ? item.sidebarLabel : item.label}</span>
              </button>
            ))}
            <SidebarScrollbar paneRef={sideNavRef} />
          </nav>
        </aside>

        <div className="display-area">
          <Image
            className="home-backdrop"
            data-visible={screen === "Home" ? "" : undefined}
            src="/manga-panel.jpg"
            width={736}
            height={1109}
            alt=""
            unoptimized
          />
          <section key={screen} className="screen-content" aria-labelledby="screen-title"
            tabIndex={0} onScroll={showScrollbar}>
            {screen === "Home" ? (
              <div className="home-intro">
                <h1 id="screen-title">Chester Wong</h1>
                <p className="home-role">
                  Studying computer science @{" "}
                  <a href="https://www.ubc.ca/" target="_blank" rel="noopener noreferrer">
                    UBC
                  </a>
                  {" · Incoming software engineer intern @ RBC"}
                </p>
                <p className="home-aside">Big fan of: Kengan Ashura, lifting heavy things, and anything with an engine and 4 wheels.</p>
              </div>
            ) : (
              <h1 id="screen-title">{screen}</h1>
            )}
            {screen === "School Projects" && (
              <div className="text-panel">
                <button className="project-back" type="button" aria-label={`Back to ${schoolProjectsOrigin}`}
                  onClick={() => setScreen(schoolProjectsOrigin)}>
                  <Icon name="back" size={20} />
                </button>
                {schoolProjectsIntro.trim() && <p className="school-project-intro">{schoolProjectsIntro}</p>}
                {schoolProjects.length === 0 && <p>No school projects listed yet.</p>}
              </div>
            )}
            {!!tiles?.length && (
              <div className="app-grid" data-screen={screen}>
                {tiles.map((item) => "screen" in item ? (
                  <button className="app-tile" key={item.screen} onClick={() => {
                    if (item.screen === "School Projects") {
                      setSchoolProjectsOrigin(screen === "Overview" ? "Overview" : "Projects");
                    }
                    setScreen(item.screen);
                  }}>
                    {"logo" in item
                      ? <EntryIcon entry={item} size={28} />
                      : <span className={`app-icon ${item.color}`}><Icon name={item.icon} size={28} /></span>}
                    <strong>{item.label}</strong>
                  </button>
                ) : (
                  <button className="app-tile" key={`${item.name}:${("githubUrl" in item && item.githubUrl) || item.className}`}
                    aria-haspopup="dialog"
                    data-selected={selected === item} onClick={() => setSelected(item)}>
                    <EntryIcon entry={item} size={29} />
                    <strong>{item.name}</strong>
                  </button>
                ))}
              </div>
            )}

            {screen === "About" && (
              <div className="text-panel">
                <p></p>
              </div>
            )}

            {screen === "Contact" && (
              <div className="text-panel">
                <p>Feel free to reach out via email or linkedin!</p>
                <a className="action" href="mailto:w.chester@outlook.com"><Icon name="mail" size={20} />w.chester@outlook.com</a>
              </div>
            )}

          </section>
        </div>

        <nav className="bottom-bar" aria-label="Quick navigation">
          <button className="bottom-home" type="button" aria-label="Home"
            aria-current={screen === "Home" ? "page" : undefined}
            onClick={() => setScreen("Home")}>
            <Icon name="home" size={24} />
          </button>
        </nav>
      </div>

      <dialog ref={dialogRef} onClose={() => setSelected(null)} className="project-dialog" aria-labelledby="entry-title">
        {selected && (
          <div className="dialog-body">
            <form method="dialog"><button className="close-button" autoFocus aria-label="Close details">×</button></form>
            <EntryIcon entry={selected} size={28} />
            {experienceDetails && <p className="fine-print">{experienceDetails}</p>}
            <h2 id="entry-title">
              <EntryLink name={selected.name}
                url={"companyUrl" in selected ? selected.companyUrl : projectGitHubUrl} />
            </h2>
            {jobTitle && <p className="job-title">{jobTitle}</p>}
            {jobTitle && selected.detail && <hr className="job-description-divider" />}
            {selected.detail && (
              <p>{typeof selected.detail === "string" ? selected.detail : selected.detail.map((part) => (
                typeof part === "string" ? part : <EntryLink key={part.url} name={part.text} url={part.url} />
              ))}</p>
            )}
            {selected.tags && <p className="fine-print">{selected.tags}</p>}
          </div>
        )}
      </dialog>
    </main>
  );
}
