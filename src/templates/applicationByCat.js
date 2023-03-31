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
export default function ApplicationByCat() {
  const [applicationsByCat, setApplicationsByCat] = useState([]);
  const [resName, setResName] = useState('');
  let { resourceName } = useParams();
  const fetchApplication = () => {
    var removespace = resourceName.replace(' ', '%20');
    const fetchUrl =
      'https://engineering-task.elancoapps.com/api/resources/' + removespace;

    fetch(fetchUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var finalSet = data.map((x) => {
          return x.ResourceGroup;
        });
        var dataset = [...new Set(finalSet)];
        setApplicationsByCat(dataset);
      })
      .catch((e) => {
        console.log(e);
      });

    setResName(resourceName);
  };

  useEffect(() => {
    fetchApplication();
  }, [setApplicationsByCat, resourceName]);

  return (
    <div>
      <div className="inner-head">{resourceName} based applications</div>
      {applicationsByCat.length >= 0 && (
        <ul>
          {applicationsByCat.map((applicationsByCat, index) => (
            <li key={applicationsByCat + '_' + index}>
              <Link to={'/applications/' + applicationsByCat}>
                <img src={ApplicationLogo} />
                <span>{applicationsByCat}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
