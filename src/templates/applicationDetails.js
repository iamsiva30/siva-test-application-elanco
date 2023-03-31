import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useParams,
} from 'react-router-dom';
export default function ApplicationDetails() {
  const [applicationsDetails, setApplicationsDetails] = useState([]);
  const [appName, setAppName] = useState('');
  let { applicationName } = useParams();
  const fetchApplication = () => {
    var removespace = applicationName.replace(' ', '%20');
    const fetchUrl =
      'https://engineering-task.elancoapps.com/api/applications/' + removespace;

    fetch(fetchUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApplicationsDetails(data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(applicationsDetails);
    setAppName(applicationName);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    var selectValue = e.target.value;
    let newsortArray;
    const applicationsort = [...applicationsDetails];
    console.log(applicationsort);
    if (selectValue == 'ConsumedQuantity low to high') {
      newsortArray = applicationsort.sort((a, b) => {
        return a.ConsumedQuantity - b.ConsumedQuantity;
      });
    } else if (selectValue == 'Cost low to high') {
      newsortArray = applicationsort.sort((a, b) => {
        return a.Cost - b.Cost;
      });
    } else if (selectValue == 'ConsumedQuantity high to low') {
      newsortArray = applicationsort.sort((a, b) => {
        return b.ConsumedQuantity - a.ConsumedQuantity;
      });
    } else if (selectValue == 'Cost high to low') {
      newsortArray = applicationsort.sort((a, b) => {
        return b.Cost - a.Cost;
      });
    }
    setApplicationsDetails(newsortArray);
    console.log(applicationsDetails);
  };
  useEffect(() => {
    fetchApplication();
  }, [applicationName]);

  return (
    <div>
      <div className="inner-head">{applicationName} History</div>
      <div className="sort">
        <label htmlFor="cars">Sort By:</label>
        <select name="sort List" id="versionSort" onChange={handleChange}>
          <option value="">Select Option</option>
          <option value="ConsumedQuantity low to high">
            ConsumedQuantity low to high
          </option>
          <option value="ConsumedQuantity high to low">
            ConsumedQuantity high to low
          </option>
          <option value="Cost low to high">Cost low to high</option>
          <option value="Cost high to low">Cost high to low</option>
        </select>
      </div>
      {applicationsDetails.length >= 0 && (
        <div>
          <div className="container">
            <div className="heading">
              <div className="col">ConsumedQuantity</div>
              <div className="col">Cost</div>
              <div className="col">Date</div>
              <div className="col">InstanceId</div>
              <div className="col">App-name</div>
              <div className="col">ResourceLocation</div>
              <div className="col">Environment</div>
              <div className="col">UnitOfMeasure</div>
            </div>
            {applicationsDetails.map((applicationsDetails, index) => (
              <div
                key={applicationsDetails + '_' + index}
                className="table-row"
              >
                <div className="col">
                  {applicationsDetails.ConsumedQuantity}
                </div>
                <div className="col">{applicationsDetails.Cost}</div>
                <div className="col">{applicationsDetails.Date}</div>
                <div className="col">{applicationsDetails.InstanceId}</div>
                <div className="col">{applicationsDetails.ResourceGroup}</div>
                <div className="col">
                  {applicationsDetails.ResourceLocation}
                </div>
                <div className="col">
                  {applicationsDetails.Tags.environment}
                </div>
                <div className="col">{applicationsDetails.UnitOfMeasure}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
