const paths = {
  github: (
    <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
      <path d="M8 11v6m4 0v-6m0 3a2.5 2.5 0 0 1 5 0v3" />
    </>
  ),
  resume: <><path className="icon-tone" d="M5 2h9l5 5v15H5z" /><path d="M14 2v6h5M8 12h8m-8 4h5" /><path d="M8 20h3" /></>,
  home: <><path className="icon-tone" d="M4 10 12 3l8 7v11H4z" /><path d="m2 11 10-9 10 9M9 21v-8h6v8" /></>,
  grid: <><path className="icon-tone" d="M3 3h7v7H3zm11 11h7v7h-7z" /><path d="M14 3h7v7h-7zM3 14h7v7H3z" /></>,
  tools: <><path className="icon-tone" d="m12 2 10 5-10 5L2 7z" /><path d="m2 12 10 5 10-5M2 17l10 5 10-5M12 12v10" /></>,
  user: <><path className="icon-tone" d="M4 22v-3a8 8 0 0 1 16 0v3z" /><circle cx="12" cy="7" r="4" /><path d="m8 14 4 4 4-4" /></>,
  mail: <><path className="icon-tone" d="M2 6h20v15H2z" /><path d="m2 6 10 8L22 6M2 21l7-7m13 7-7-7M7 3h10" /></>,
  sport: <><path className="icon-tone" d="M4 20a10 10 0 1 1 16 0z" /><path d="M4 20a10 10 0 1 1 16 0H4ZM5 12h2m10 0h2M12 5v2M6 6l1.5 1.5M18 6l-1.5 1.5M12 15l5-6" /><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" /></>,
  comfort: <><path className="icon-tone" d="M4 20a10 10 0 1 1 16 0z" /><path d="M4 20a10 10 0 1 1 16 0H4ZM5 12h2m10 0h2M12 5v2M6 6l1.5 1.5M18 6l-1.5 1.5M12 15l-4-4" /><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" /></>,
  orbit: <><circle className="icon-tone" cx="12" cy="12" r="6" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-38 12 12)" /><path d="M10 8a4 4 0 0 1 5 2" /><circle cx="20" cy="5" r="1.6" fill="currentColor" stroke="none" /></>,
  forma: <><path className="icon-tone" d="m3 21 7-18 5 9-4 9z" /><path d="m10 3 11 18H3zm-3 9h8m-4 9 4-9 6 9" /></>,
  pulse: <><path className="icon-tone" d="M2 9h3v6H2zm8-6h4v18h-4zm9 4h3v10h-3z" /><path d="M7 6v12M17 4v16" /></>,
  briefcase: <><path className="icon-tone" d="M2 7h20v14H2z" /><path d="M8 7V3h8v4M2 11l10 4 10-4M10 14v3h4v-3" /></>,
  frontend: <><rect className="icon-tone" x="2" y="3" width="20" height="16" rx="1" /><path d="M2 7h20m-13 3-3 3 3 3m6-6 3 3-3 3M8 22h8m-4-3v3" /><path d="M5 5h.01M8 5h.01" /></>,
  design: <><path className="icon-tone" d="m12 2 8 12-8 8-8-8z" /><path d="M12 2v10m-8 2h5m6 0h5" /><circle cx="12" cy="14" r="3" /></>,
  web: <><path className="icon-tone" d="M3 6h18v15H3z" /><path d="M3 10h18M7 3h10M7 14l-2 2 2 2m10-4 2 2-2 2m-4-5-2 6" /></>,
};

export function Icon({ name, size = 22 }: { name: keyof typeof paths; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" className={`portfolio-icon icon-${name}`} strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
