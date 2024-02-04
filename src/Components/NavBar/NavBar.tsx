import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navBar--container">
      <NavLink
        className={({ isActive }) => (isActive ? "selected--navbar" : "")}
        to="/"
      >
        Tasks
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "selected--matrix" : "")}
        to="/matrix"
      >
        Matrix
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "selected--notes" : "")}
        to="/notes"
      >
        Notes
      </NavLink>
    </div>
  );
}

export default NavBar;
