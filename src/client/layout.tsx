import type { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="/" end>
            Example store
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalog" end>
                  Catalog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" end>
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col"></div>
        </div>
        {children}
      </div>
    </>
  );
};
