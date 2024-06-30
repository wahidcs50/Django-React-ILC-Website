import React from 'react';
import Sidebar from '../Components/Sidebar';
import { useEventContext } from '../hooks/EventContext';
import '../Studentdashborad/styling/events.css';
import DashboardHeader from '../Components/Dashboardheader';
import { format } from 'date-fns';

const Events = () => {
  const eventList = useEventContext();
  console.log(eventList);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div className="event-main-container">
        <DashboardHeader />
        <div className="page-address text-dark">Home / Events</div>
        <div className="event-cards-container">
          {eventList.map((event) => {
            const formattedDate = format(new Date(event.date_and_time), 'yyyy-MM-dd HH:mm:ss');
            return (
              <div className="event-card" key={event.id}>
                <div className="event-card-image">
                  <img src={event.images} alt="Event" />
                </div>
                <div className="event-card-details">
                  <h5 className="event-title">{event.title}</h5>
                  <p className="event-description">{event.description}</p>
                  <p className="event-date">{formattedDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;


