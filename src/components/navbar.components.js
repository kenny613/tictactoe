import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/* <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
    </div> */}

        <div className="nav-content collpase navbar-collapse text-light">
          <a href="/" class="text-light">
            <Link className="Nav__link" to="/">
              {" "}
              TicTacToe with player
            </Link>
          </a>
        </div>
        {/*<div className="AI nav-content collpase navbar-collapse text-light">
          <a href="/AI" class="text-light">
            <Link className="Nav__link" to="/AI">
              {" "}
              TicTacToe with AI
            </Link>
          </a>
  </div>*/}
      </nav>
    );
  }
}
