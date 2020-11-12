import React, { useContext, useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user/context";
import Toast from "./Toast";
function Nav() {
  const context = useContext(UserContext);
  if (localStorage.getItem("auth")) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        {!localStorage.getItem("auth")? (
               <Link className="nav-link" to="/">
               HOME
             </Link>
            ) : null}
      
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/feed">
                feed
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/createpost">
                create
              </Link>
            </li>
            {!localStorage.getItem("auth") ? (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  register
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <button
                className="btn btn-danger"
                onClick={() => context.logOut()}
              >
                LOG OUT
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return null;
}

export default Nav;
