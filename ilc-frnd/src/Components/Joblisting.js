// JobListing.jsx
import React from 'react';
import jobs from '../data/jobs.json'; 
import { Route, Routes } from 'react-router-dom'; 

import JobsList from './Joblist';


const JobListing = () => {
    console.log(jobs)
  return (
    <Routes>
      <Route path="/" element={<JobsList jobs={jobs}/>} />
    </Routes>
  );
};

export default JobListing;
