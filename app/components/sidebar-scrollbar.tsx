import { useEffect, useRef, type PointerEvent, type RefObject } from "react";

export function SidebarScrollbar({ paneRef }: { paneRef: RefObject<HTMLElement | null> }) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointerY: number; scrollTop: number; scrollPerPixel: number } | null>(null);

  useEffect(() => {
    const pane = paneRef.current;
    const thumb = thumbRef.current;
    if (!pane || !thumb) return;

    const updateThumb = () => {
      const { clientHeight, scrollHeight, scrollTop, offsetTop } = pane;
      const scrollRange = scrollHeight - clientHeight;
      const thumbHeight = scrollRange > 0
        ? Math.max(Math.min(20, clientHeight / 2), clientHeight * clientHeight / scrollHeight)
        : 0;
      const thumbOffset = scrollRange > 0
        ? Math.min(1, Math.max(0, scrollTop / scrollRange)) * (clientHeight - thumbHeight)
        : 0;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${offsetTop}px`;
      thumb.style.transform = `translateY(${thumbOffset}px)`;
    };

    updateThumb();
    pane.addEventListener("scroll", updateThumb, { passive: true });
    const observer = new ResizeObserver(updateThumb);
    observer.observe(pane);
    return () => {
      observer.disconnect();
      pane.removeEventListener("scroll", updateThumb);
    };
  }, [paneRef]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    const pane = paneRef.current;
    if (event.button !== 0 || !event.isPrimary || !pane) return;

    const thumb = event.currentTarget;
    const thumbTravel = pane.clientHeight - thumb.getBoundingClientRect().height;
    if (thumbTravel <= 0) return;

    event.preventDefault();
    thumb.setPointerCapture(event.pointerId);
    thumb.setAttribute("data-dragging", "");
    drag.current = {
      pointerY: event.clientY,
      scrollTop: pane.scrollTop,
      scrollPerPixel: (pane.scrollHeight - pane.clientHeight) / thumbTravel,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const pane = paneRef.current;
    const start = drag.current;
    if (!pane || !start || !event.currentTarget.hasPointerCapture(event.pointerId)) return;

    pane.scrollTop = start.scrollTop + (event.clientY - start.pointerY) * start.scrollPerPixel;
  }

  return (
    <div
      ref={thumbRef}
      aria-hidden="true"
      className="sidebar-scrollbar"
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onLostPointerCapture={(event) => {
        drag.current = null;
        event.currentTarget.removeAttribute("data-dragging");
      }}
    />
  );
}
