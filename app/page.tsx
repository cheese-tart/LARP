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
const sidebarShortcuts = [overview, about, experience, allProjects, contact];

type Section = (typeof shortcuts)[number]["screen"];
type PortfolioEntry = (typeof projects)[number] | (typeof experiences)[number];

const entriesBySection: Partial<Record<Section, readonly PortfolioEntry[]>> = {
  Overview: [...experiences, ...projects],
  Projects: projects,
  Experience: experiences,
};

export default function Home() {
  const [screen, setScreen] = useState<Section>("Overview");
  const [mode, setMode] = useState<"Comfort" | "Sport">("Comfort");
  const [clock, setClock] = useState("--:--");
  const [selected, setSelected] = useState<PortfolioEntry | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const entries = entriesBySection[screen];

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat(undefined, {
      hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).format(new Date()));
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
            <time aria-label="Local time">{clock}</time>
            <button className="display-toggle" aria-label="Sport display mode"
              aria-pressed={mode === "Sport"}
              onClick={() => setMode((current) => current === "Comfort" ? "Sport" : "Comfort")}>
              <Icon name="sun" size={17} />
              <span>{mode}</span>
            </button>
          </div>
        </header>

        <aside className="side-rail">
          <strong className="identity">Your Name</strong>
          <nav className="side-nav" aria-label="Portfolio sections">
            {sidebarShortcuts.map((item) => (
              <button key={item.screen} aria-current={screen === item.screen ? "page" : undefined}
                onClick={() => setScreen(item.screen)}>
                <Icon name={item.icon} size={21} />
                <span>{item.screen}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="display-area">
          <section key={screen} className="screen-content" aria-labelledby="screen-title">
            <h1 id="screen-title">{screen}</h1>
            {entries && (
              <div className="app-grid">
                {entries.map((entry) => (
                  <button className="app-tile" key={entry.className} aria-haspopup="dialog"
                    data-selected={selected === entry} onClick={() => setSelected(entry)}>
                    <span className={`app-icon ${entry.className}`}><Icon name={entry.className} size={29} /></span>
                    <strong>{entry.name}</strong>
                  </button>
                ))}
                {screen === "Overview" && shortcuts.slice(1).map((item) => (
                  <button className="app-tile" key={item.screen} onClick={() => setScreen(item.screen)}>
                    <span className={`app-icon ${item.color}`}><Icon name={item.icon} size={28} /></span>
                    <strong>{item.label}</strong>
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
