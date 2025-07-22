import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/user/actions";
import Can from "../rbac/Can";
import "../pages/Home.css";

function UserHeader() {
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-body">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-shareit">share<span className="brand-it">It</span></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* future nav links */}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle text-capitalize text-light"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userDetails?.name || "Account"}
              </span>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/manage-payments">
                    💳 Manage Payments
                  </Link>
                </li>

                <Can permission="canViewUser">
                  <li>
                    <Link className="dropdown-item" to="/users">
                      👥 Manage Users
                    </Link>
                  </li>
                </Can>

                <li>
                  <Link className="dropdown-item" to="/trigger-reset">
                    🔒 Reset Password
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item text-danger" to="/logout">
                    🚪 Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
