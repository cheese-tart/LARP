const paths = {
  grid: (
    <>
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="3" width="6" height="6" />
      <rect x="3" y="15" width="6" height="6" />
      <rect x="15" y="15" width="6" height="6" />
    </>
  ),
  tools: (
    <>
      <path d="M15 6l3 3 3-3a5 5 0 0 1-6 6L6 21a2 2 0 0 1-3-3l9-9a5 5 0 0 1 6-6z" />
      <path d="m3 4 1-1 3 2-2 2zM6 6l3 3m7 5 5 5-2 2-5-5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="6.5" r="3.5" />
      <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="5" />
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-35 12 12)" />
    </>
  ),
  forma: (
    <>
      <path d="M3 21V10l6-4v15m0 0V3l7 4v14m0 0V10l5 3v8z" />
      <path d="M2 21h20" />
    </>
  ),
  pulse: <path d="M2 12h4l3-7 5 14 3-7h5"/>,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" />
      <path d="M8 7V4h8v3M3 12h18m-9-1v3" />
    </>
  ),
  frontend: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18" />,
  design: (
    <>
      <path d="M3 21l2-6L16 4l4 4L9 19zM13 7l4 4M5 15l4 4" />
      <path d="M15 21h6" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
};

export function Icon({ name, size = 22 }: { name: keyof typeof paths; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
