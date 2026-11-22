const paths = {
  back: <path d="m15 5-7 7 7 7" strokeWidth="2.5" />,
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
  wrench: <path className="icon-tone" d="m19 2.5-3.2 3.2 2.5 2.5L21.5 5a5.5 5.5 0 0 1-6.8 7.3l-8.4 8.4a2.1 2.1 0 0 1-3-3l8.4-8.4A5.5 5.5 0 0 1 19 2.5Z" />,
  dumbbell: (
    <>
      <path d="M5 9H2v6h3m14-6h3v6h-3M9 10.5h6m-6 3h6" />
      <rect className="icon-tone" x="5" y="6" width="4" height="12" rx="1" />
      <rect className="icon-tone" x="15" y="6" width="4" height="12" rx="1" />
    </>
  ),
  mountain: (
    <>
      <path className="icon-tone" d="m2 20 8-15 4.3 8 3-4L22 20Z" />
      <path d="m7 10.6 3 2.4 3-2.4" />
    </>
  ),
  "graduation-cap": (
    <>
      <path d="M6 11v5c3 3 9 3 12 0v-5M22 9v7" />
      <path className="icon-tone" d="m2 9 10-5 10 5-10 5Z" />
    </>
  ),
  user: <><path className="icon-tone" d="M4 22v-3a8 8 0 0 1 16 0v3z" /><circle cx="12" cy="7" r="4" /><path d="m8 14 4 4 4-4" /></>,
  mail: <><path className="icon-tone" d="M2 6h20v15H2z" /><path d="m2 6 10 8L22 6M2 21l7-7m13 7-7-7M7 3h10" /></>,
  sport: <><path className="icon-tone" d="M4 20a10 10 0 1 1 16 0z" /><path d="M4 20a10 10 0 1 1 16 0H4ZM5 12h2m10 0h2M12 5v2M6 6l1.5 1.5M18 6l-1.5 1.5M12 15l5-6" /><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" /></>,
  comfort: <><path className="icon-tone" d="M4 20a10 10 0 1 1 16 0z" /><path d="M4 20a10 10 0 1 1 16 0H4ZM5 12h2m10 0h2M12 5v2M6 6l1.5 1.5M18 6l-1.5 1.5M12 15l-4-4" /><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" /></>,
  briefcase: <><path className="icon-tone" d="M2 7h20v14H2z" /><path d="M8 7V3h8v4M2 11l10 4 10-4M10 14v3h4v-3" /></>,
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
