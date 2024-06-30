import "../Studentdashborad/styling/studentdashboard.css";
import Carousel from 'react-bootstrap/Carousel';
import DashboardHeader from '../Components/Dashboardheader';
import React, { useState, useEffect } from "react";
import Sidebar from '../Components/Sidebar';
import axios from "axios";
import Cookies from 'js-cookie';
import { useEventContext } from '../hooks/EventContext';
import useRefreshToken from '../Apis/Refreshtoken'; // Import the token refresh hook

const StudentDashboard = () => {
    const { refreshAccessToken } = useRefreshToken();
    const eventList = useEventContext();
    const [jobs, setJobs] = useState(() => {
      const storedJobs = localStorage.getItem('jobs');
      return storedJobs ? JSON.parse(storedJobs) : [];
    });

    const [interestedEvents, setInterestedEvents] = useState(() => {
      const storedEvents = localStorage.getItem('interestedEvents');
      return storedEvents ? JSON.parse(storedEvents) : [];
    });

    const [showAllJobs, setShowAllJobs] = useState(false);
    const [appliedJobsCount, setAppliedJobsCount] = useState(() => {
      const storedJobsCount = localStorage.getItem('appliedJobsCount');
      return storedJobsCount ? parseInt(storedJobsCount) : 0;
    });
    const [appliedEventsCount, setAppliedEventsCount] = useState(() => {
      const storedEventsCount = localStorage.getItem('appliedEventsCount');
      return storedEventsCount ? parseInt(storedEventsCount) : 0;
    });
    const handleSeeAllClick = () => {
        setShowAllJobs(true);
      };

    useEffect(() => {
      const fetchData = async () => {
        try {
          await fetchJobs();
          await fetchInterestedEvents();
          await fetchAppliedJobsCount();
          await fetchAppliedEventsCount();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const fetchJobs = async () => {
        let accessToken = Cookies.get('access_token');
        const csrfCookieValue = Cookies.get('csrftoken');
        let response

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfCookieValue,
          },
        };

        try {
          let response = await axios.get('http://localhost:8000/api/job/applied-jobs-list/', config);
          setJobs(response.data);
          localStorage.setItem('jobs', JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching jobs:', error);
          if (error.response && error.response.status === 401) {
            try {
              const accessToken = await refreshAccessToken();
              config.headers.Authorization= `Bearer ${accessToken }`
              response = await axios.get('http://localhost:8000/api/job/applied-jobs-list/', config);
              setJobs(response.data);
              localStorage.setItem('jobs', JSON.stringify(response.data));
            } catch (refreshError) {
              console.error("Error refreshing access token:", refreshError);
            }
          }
        }
      };

      const fetchInterestedEvents = async () => {
        let accessToken = Cookies.get('access_token');
        const csrfCookieValue = Cookies.get('csrftoken');
        let response

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfCookieValue,
          },
        };

        try {
          let response = await axios.get('http://localhost:8000/api/event/interested_events/', config);
          setInterestedEvents(response.data);
          localStorage.setItem('interestedEvents', JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching interested events:", error);
          if (error.response && error.response.status === 401) {
            try {
              const newaccessToken = await refreshAccessToken();
              config.headers.Authorization=`Bearer ${newaccessToken}`;
              response = await axios.get('http://localhost:8000/api/event/interested_events/', config);
              setInterestedEvents(response.data);
              localStorage.setItem('interestedEvents', JSON.stringify(response.data));
            } catch (refreshError) {
              console.error("Error refreshing access token:", refreshError);
            }
          }
        }
      };

      const fetchAppliedJobsCount = async () => {
        let accessToken = Cookies.get('access_token');
        const csrfCookieValue = Cookies.get('csrftoken');
        let response

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfCookieValue,
          },
        };

        try {
          let response = await axios.get('http://localhost:8000/api/job/applied-jobs/', config);
          const count = response.data.length;
          setAppliedJobsCount(count);
          localStorage.setItem('appliedJobsCount', count.toString());
        } catch (error) {
          if (error.response && error.response.status === 401) {
            try {
              const newaccessToken = await refreshAccessToken();
              config.headers.Authorization=`Bearer ${newaccessToken}`
              response = await axios.get('http://localhost:8000/api/job/applied-jobs/', config);
              const count = response.data.length;
              setAppliedJobsCount(count);
              localStorage.setItem('appliedJobsCount', count.toString());
            } catch (refreshError) {
              console.error("Error refreshing access token:", refreshError);
            }
          } else {
            console.error("Error fetching applied jobs:", error);
          }
        }
      };

    const fetchAppliedEventsCount = async () => {
      let accessToken = Cookies.get('access_token');
      const csrfCookieValue = Cookies.get('csrftoken');
      let response

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfCookieValue,
        },
      };

      try {
        let response = await axios.get('http://localhost:8000/api/event/interested_events/', config);
        const count = response.data.length;
        setAppliedEventsCount(count);
        localStorage.setItem('appliedEventsCount', count.toString());
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newaccessToken = await refreshAccessToken();
          config.headers.Authorization=`Bearer ${newaccessToken}`
          try {
            response = await axios.get('http://localhost:8000/api/event/interested_events/', config);
            const count = response.data.length;
            setAppliedEventsCount(count);
            localStorage.setItem('appliedEventsCount', count.toString());
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
          }
        } else {
          console.error("Error fetching applied events:", error);
        }
      }
    };
       fetchData();
    }, []);
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar/>
        <div className="main-container">
          <DashboardHeader/>
          <div className="page-address text-dark">Home / Home</div>
           <div className="image-slider">
              <Carousel className="board_slider">
                {eventList.map((event) => (
                  <Carousel.Item key={event.id} interval={2000}>
                    <img className="d-block" src={event.images} alt="Event" />
                    <Carousel.Caption>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          <div className="homemain-container  mt-5">
            <div className="row">
              <div className="jobcount-heading-image">
                <h3 className='Jobcount-heading'>You have Applied for {appliedJobsCount} Jobs</h3>
                {!showAllJobs && jobs.length > 2 && (
                        <button className="btn  rounded-pill jobcount-button" onClick={handleSeeAllClick}>See All</button>
                      )}
              </div>
             <div className="col-md-6">
                <div className="applied-jobs-container">
                  {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                      <div key={index} className="applied-job">
                        <h4>{job.career.title}</h4>
                        <p className="job-details">
                          {job.career.description.split('\n').slice(0, 2).join('\n')}
                        </p>
                        <a href="#" className="learn-more-btn">Learn More</a>
                      </div>
                    ))
                  ) : (
                    <p>No jobs available</p>
                  )}
                </div>
              </div>

              <div className="col-md-12 ">
                <div className="card-container">
                 <div class="registered-events-container-heading">
                    <h2 class="registered-events-title">You Participated in {appliedEventsCount} Events  </h2>
                    <button class="eventcount-button rounded-pill">See All</button>
                  </div>
                  <div class="events-container">
                    {interestedEvents.map((event, index) => (
                      <div class="event-card" key={index}>
                        <div class="event-header" style={{ backgroundImage: `url(${event.event.images})` }}>
                          <h2 class="event-title">{event.event.title}</h2>
                        </div>
                        <div class="event-body">
                          <p class="event-description">{event.event.description}</p>
                          <button class="learn-more-btn">Learn More</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default StudentDashboard;

