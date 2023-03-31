import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useParams,
} from 'react-router-dom';
export default function Sidebar() {
  const [services, setServices] = useState([]);

  const fetchServices = () => {
    fetch('https://engineering-task.elancoapps.com/api/resources')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setServices(data);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div>
      {services.length > 0 && (
        <ul>
          {services.map((services, index) => (
            <li key={services + '_' + index}>
              <Link to={'/resources/' + services}>{services}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
