import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogout = () => {
    logout();  // Call the logout function from context
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <header className="theme-main-menu menu-overlay menu-style-six sticky-menu">
      <div className="inner-content gap-two">
        <div className="top-header position-relative">
          <div className="d-flex align-items-center">
            <div className="logo order-lg-0">
              <Link to={"/"} className="d-flex align-items-center">
                <img src="images/logo/ae-logo-2022.svg" alt="Logo" width={100} />
              </Link>
            </div>

            <div className="right-widget ms-auto me-3 me-lg-0 order-lg-3">
              <ul className="d-flex align-items-center style-none">
                <li className="d-none d-md-inline-block me-4">
                  {auth ? (
                    <a onClick={handleLogout} className="btn-ten rounded-0" >
                      <span>Logout</span> 
                    </a>
                  ) : (
                    <Link to="/login"><span>Login</span></Link>
                  )}
                </li>
              </ul>
            </div>

            <nav className="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2">
              <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span />
              </button>
              <div className="collapse navbar-collapse ms-xl-5" id="navbarNav">
                <ul className="navbar-nav align-items-lg-center">
                  <li className="d-block d-lg-none">
                    <div className="logo">
                      <Link to={"/"} className="d-block">
                        <img src="images/logo/logo_06.svg" alt="Logo" />
                      </Link>
                    </div>
                  </li>
                  {/* <li className="nav-item dashboard-menu">
                    <Link className="nav-link" to={"/"} >Dashboard</Link>
                  </li> */}
                  <li className="nav-item dashboard-menu">
                    <Link className="nav-link" to="/create-event" >Add Events</Link>
                  </li>
                  <li className="nav-item dashboard-menu">
                    <Link className="nav-link" to="/my-event">My Events</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header> 
  );
};

export default Header;
