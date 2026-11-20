"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./components/portfolio-icon";
import { experiences } from "./experiences";
import { projects } from "./projects";

const shortcuts = [
  { screen: "Overview", label: "Overview", icon: "grid", color: "home" },
  { screen: "Experience", label: "Experience", icon: "briefcase", color: "experience" },
  { screen: "Projects", label: "All projects", icon: "tools", color: "projects" },
  { screen: "About", label: "About", icon: "user", color: "profile" },
  { screen: "Contact", label: "Contact", icon: "mail", color: "contact" },
] as const;

const [overview, experience, allProjects, about, contact] = shortcuts;
const sidebarShortcuts = [
  overview,
  experience,
  { ...allProjects, label: "Projects" },
  about,
  contact,
] as const;

type Section = "Home" | (typeof shortcuts)[number]["screen"];
type PortfolioEntry = (typeof projects)[number] | (typeof experiences)[number];

const entriesBySection: Partial<Record<Section, readonly PortfolioEntry[]>> = {
  Projects: projects,
  Experience: experiences,
};

const overviewTiles = [...experiences, ...projects, experience, allProjects, about, contact]
  .sort((a, b) => {
    const firstLabel = "label" in a ? a.label : a.name;
    const secondLabel = "label" in b ? b.label : b.name;
    return firstLabel.localeCompare(secondLabel, "en");
  });

export default function Home() {
  const [screen, setScreen] = useState<Section>("Home");
  const [mode, setMode] = useState<"Comfort" | "Sport">("Sport");
  const [clock, setClock] = useState({ digits: "--:--", period: "" });
  const [selected, setSelected] = useState<PortfolioEntry | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tiles = screen === "Overview" ? overviewTiles : entriesBySection[screen];

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
              <a className="status-icon" href="https://github.com/cheese-tart/my-app"
                aria-label="GitHub repository" title="GitHub repository">
                <Icon name="github" size={17} />
              </a>
              <button className="status-icon" type="button" aria-label="LinkedIn" disabled>
                <Icon name="linkedin" size={17} />
              </button>
              <button className="status-icon" type="button" aria-label="Résumé" disabled>
                <Icon name="resume" size={17} />
              </button>
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
          <strong className="identity">Your Name</strong>
          <nav className="side-nav" aria-label="Portfolio sections">
            <button aria-current={screen === "Home" ? "page" : undefined}
              onClick={() => setScreen("Home")}>
              <Icon name="home" size={21} />
              <span>Home</span>
            </button>
            {sidebarShortcuts.map((item) => (
              <button key={item.screen} aria-current={screen === item.screen ? "page" : undefined}
                onClick={() => setScreen(item.screen)}>
                <Icon name={item.icon} size={21} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="display-area">
          <section key={screen} className="screen-content" aria-labelledby="screen-title">
            <h1 id="screen-title">{screen === "Home" ? "Hi" : screen}</h1>
            {screen === "Home" && (
              <div className="text-panel">
                <p>Welcome to my little corner of the internet. This is a place for ideas, experiments, and the things I’m making along the way.</p>
                <p>Some days are spent sketching something new, others are spent turning small details into something useful. Have a look around and see what catches your eye.</p>
              </div>
            )}
            {tiles && (
              <div className="app-grid">
                {tiles.map((item) => "screen" in item ? (
                  <button className="app-tile" key={item.screen} onClick={() => setScreen(item.screen)}>
                    <span className={`app-icon ${item.color}`}><Icon name={item.icon} size={28} /></span>
                    <strong>{item.label}</strong>
                  </button>
                ) : (
                  <button className="app-tile" key={item.className} aria-haspopup="dialog"
                    data-selected={selected === item} onClick={() => setSelected(item)}>
                    <span className={`app-icon ${item.className}`}><Icon name={item.className} size={29} /></span>
                    <strong>{item.name}</strong>
                  </button>
                ))}
              </div>
            )}

            {screen === "About" && (
              <div className="text-panel">
                <p>I’m a designer and developer who cares about how things look, how they work, and how they make people feel.</p>
                <p>I work across interface design, design systems, and frontend development with React and Next.js.</p>
              </div>
            )}

            {screen === "Contact" && (
              <div className="text-panel">
                <p>For projects and collaborations, get in touch by email.</p>
                <a className="action" href="mailto:hello@example.com"><Icon name="mail" size={20} />hello@example.com</a>
                <p className="fine-print">Sample address</p>
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
            <span className={`app-icon ${selected.className}`}><Icon name={selected.className} size={28} /></span>
            <p className="fine-print">
              {"period" in selected ? `Sample experience · ${selected.period}` : `Sample project · ${selected.year}`}
            </p>
            <h2 id="entry-title">{selected.name}</h2>
            <p>{selected.detail}</p>
            <p className="fine-print">{selected.tags}</p>
          </div>
        )}
      </dialog>
    </main>
  );
}
