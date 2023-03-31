import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useParams,
} from 'react-router-dom';
import { default as ApplicationLogo } from '../images/application.svg';
export default function Home() {
  const [applications, setApplications] = useState([]);

  const fetchApplication = () => {
    fetch('https://engineering-task.elancoapps.com/api/applications')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApplications(data);
      });
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <div>
      <div className="inner-head">All Applications of Elanco</div>
      {applications.length > 0 && (
        <ul>
          {applications.map((applications, index) => (
            <li key={applications + '_' + index}>
              <Link to={'/applications/' + applications}>
                <img src={ApplicationLogo} />
                <span>{applications}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
