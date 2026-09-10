// Re-renders on every route change, so each page opens with the site's
// editorial entrance: content rises softly while a page-coloured veil with
// a hairline leading edge lifts away. Pure CSS (see globals.css) and
// disabled under prefers-reduced-motion by the global motion guard.
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="page-enter">{children}</div>
      <div aria-hidden="true" className="page-veil" />
    </>
  );
}
