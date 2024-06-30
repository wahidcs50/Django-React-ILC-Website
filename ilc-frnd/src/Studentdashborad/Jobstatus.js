
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Studentdashborad/styling/jobstatus.css";
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Cookies from 'js-cookie';
import useRefreshToken from '../Apis/Refreshtoken';
import DashboardHeader from '../Components/Dashboardheader';
import {format} from 'date-fns'

const JobStatus = () => {
  const {refreashAcessToken}= useRefreshToken();
  const [jobslist, setJobs] = useState([]);
  const [visibleJobsCount, setVisibleJobsCount] = useState(3); // Initially show 3 jobs
  const [selectedJob, setSelectedJob] = useState(null); // To track the selected job for displaying full details

  useEffect(() => {
    const fetchJobs = async () => {
      const csrfCookieValue = Cookies.get('csrftoken');
      const accessToken = Cookies.get('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': csrfCookieValue
        }
      };
      try {

        // Retrieve jobs from local storage if available
        const storedJobs = localStorage.getItem('joblist');
        if (storedJobs) {
          setJobs(JSON.parse(storedJobs));
        } else {
          const response = await axios.get('http://localhost:8000/api/job/jobs/', config);
          const fetchedJobs = response.data;

          // Store jobs in local storage
          localStorage.setItem('joblist', JSON.stringify(fetchedJobs));
          setJobs(fetchedJobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        if (error.response && error.response.status=== 401){
          const newAccessToken= await refreashAcessToken()
          config.headers.Authorization=`Bearer ${newAccessToken}`;

          const storedJobs = localStorage.getItem('joblist');
          if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
          } else {
            const response = await axios.get('http://localhost:8000/api/job/jobs/', config);
            const fetchedJobs = response.data;

            // Store jobs in local storage
            localStorage.setItem('joblist', JSON.stringify(fetchedJobs));
            setJobs(fetchedJobs);
          }

        }
      }
    };

    fetchJobs();
  }, []);


  const handleSeeAll = () => {
    setVisibleJobsCount(jobslist.length); // Show all jobs
  };

  const handleJobDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleApply = () => {
    // Implement your apply logic here
    console.log("Apply button clicked!");
    // You can send an application request to your backend here
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
    }}>
      <Sidebar />
      <div className="main-container">
        <DashboardHeader/>
        <div className="page-address text-dark">Home / Jobs</div>
        <div className='mb-5'>
          <h1 className="text-center text-dark mb-4">Careers at ILC-CUI</h1>
          <p className="text-center text-dark mb-4">
            We're excited to meet you. Outlined below are the current roles that 
            <br/>
            We are looking to find new individuals to join our team.
          </p>
        </div>
        <div className='job_table' style={{ width: '100%' }}>
          <div className="text-center text-dark" >
            <h2> Job Openings</h2>
          </div>
          <table className="table table-borderless job_table" style={{ borderSpacing: '0', color:"black", marginTop:"40px"}}>
            {jobslist.slice(0, visibleJobsCount).map(job => (
              <tr key={job.id} style={{marginBottom:"30px"}} onClick={() => handleJobDetails(job)}>
                <td className="job-cell">
                  <div>
                    <span>{job.title}</span><br/>
                    <span className="posted-date">Posted: {format(new Date(job.posted_date), 'yyyy-MM-dd HH:mm:ss')}</span>
                  </div>
                </td>
                <td className="job-cell">{job.placement}</td>
                <td className="job-cell">{job.timings}</td>
                <td className="job-cell">{job.location}</td>
                <td className="job-cell">
                  <button className="job-link">See Details</button>
                </td>
              </tr>
            ))}
          </table>
          {jobslist.length > visibleJobsCount && (
            <div className="text-center mt-4">
              <Link onClick={handleSeeAll} className="job-link">See All</Link>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="job-details-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedJob.title}</h2>
            <p>Placement: {selectedJob.placement}</p>
            <p>Timings: {selectedJob.timings}</p>
            <p>Location: {selectedJob.location}</p>
            <p>Description: {selectedJob.description}</p>
            <button className="apply-button" onClick={handleApply}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobStatus;
