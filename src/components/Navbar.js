import React from "react";
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg text-light bg-dark">
      <div className="container">
        <a className="navbar-brand text-light" href="#">
          Navbar
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-light">
            <li className="nav-item mx-3">
              <Link className="nav-link active text-light" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link text-light" to="/crud">
                CRUD
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link text-light" to="/graph">
                Chart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
