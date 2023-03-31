import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import Sidebar from './templates/sidebar';
import Home from './templates/home';
import ApplicationByCat from './templates/applicationByCat';
import ApplicationDetails from './templates/applicationDetails';
import { default as logo } from './images/logo.svg';
export default function Templates() {
  return (
    <Router>
      <div className="header">
        <Link to="/">
          <img src={logo} />
          <span>Applications</span>
        </Link>
      </div>
      <div className="main-container">
        <div className="leftbar">
          <div className="inner-head">Ours Services</div>
          <Sidebar />
        </div>
        <div className="rightContainer">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/resources/:resourceName"
              element={<ApplicationByCat />}
            />
            <Route
              path="/applications/:applicationName"
              element={<ApplicationDetails />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
