import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import useRefreshToken from '../Apis/Refreshtoken';


const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const{refreshAccessToken}= useRefreshToken()
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
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

        let storedEvents = [];
        const storedEventsJson = localStorage.getItem('eventlist');
        if (storedEventsJson) {
          storedEvents = JSON.parse(storedEventsJson);
          setEventList(storedEvents);
        }

        const response = await axios.get('http://localhost:8000/api/event/events/', config);
        const latestEvents = response.data;

        if (JSON.stringify(latestEvents) !== JSON.stringify(storedEvents)) {
          localStorage.setItem('eventlist', JSON.stringify(latestEvents));
          setEventList(latestEvents);
        }
      } catch (error) {
        console.error('Error fetching or setting events:', error);
        if(error.response && error.response.status===401){

          const newAccessToken= await refreshAccessToken()
          config.headers.Authorization=`Bearer ${newAccessToken}`;

          const response = await axios.get('http://localhost:8000/api/event/events/', config);
          const latestEvents = response.data;
          let storedEvents = [];
          const storedEventsJson = localStorage.getItem('eventlist');
          if (storedEventsJson) {
            storedEvents = JSON.parse(storedEventsJson);
            setEventList(storedEvents);
          }

          if (JSON.stringify(latestEvents) !== JSON.stringify(storedEvents)) {
            localStorage.setItem('eventlist', JSON.stringify(latestEvents));
            setEventList(latestEvents);
          }

          }
      }
    };

    fetchEvents();
  }, []);
  return (
    <EventContext.Provider value={eventList}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
