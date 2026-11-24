export default function Home() {
  return (
    <div className="corner-panel home-intro">
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
  );
}
