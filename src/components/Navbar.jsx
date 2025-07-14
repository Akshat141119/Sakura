import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="petal-navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        🏠 Home
      </Link>
      <Link to="/letters" className={location.pathname === "/letters" ? "active" : ""}>
        📮 Letters Wall
      </Link>
      <Link to="/spirit" className={location.pathname === "/spirit" ? "active" : ""}>
        🌸 Ask the Spirit
      </Link>
      <Link to="/quiz" className={location.pathname === "/quiz" ? "active" : ""}>
        🧠 Quiz
      </Link>
    </nav>
  );
}