import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/styling/joblist.css'


const JobsList = ({ jobs }) => {
  return (
    <div className="jobs-container">
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <div className="button-container">
            <Link to={`/jobdetails/${job.id}`} className="details-button">View Details</Link>
            <Link to={`/apply`} className="apply-button">Apply</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
