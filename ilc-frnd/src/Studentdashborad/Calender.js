import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'
import moment from 'moment';
import DashboardHeader from '../Components/Dashboardheader';
import { useEventContext  } from '../hooks/EventContext';
import '../Studentdashborad/styling/calendar.css'; // Import your CSS file for custom styling

const Calender=()=> {
  const eventList = useEventContext();
  const [selectedDate, setSelectedDate] = useState(moment());
  console.log(eventList);
  const eventTypeColorMapping = {
    'career_fair': 'blue',
    // Add other event types and their corresponding colors here
  };
   const getBackgroundColor = (eventType) => {
    // Return the color from the mapping if available, otherwise default to 'red'
    return eventTypeColorMapping[eventType] || 'red';
  };

  const [events] = useState([
    { date: '2024-02-15', title: 'Student Job Affair', color: 'red', link: 'https://example.com/student-job-affair' },
    { date: '2024-02-20', title: 'AI workshop', color: 'blue', link: 'https://example.com/birthday-party' },
    // Add more events as needed
  ]);

  const changeDate = (amount, type) => {
    setSelectedDate(prevDate => prevDate.clone().add(amount, type));
  };

  const renderDays = () => {
    const totalBoxes = 6 * 7; // Total number of boxes to display (6 rows of 7 boxes each)
    const firstDayOfMonth = selectedDate.clone().startOf('month').day(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const daysInMonth = selectedDate.daysInMonth();

    // Calculate the number of days to display from the previous month
    const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth ;

    const blanksAtStart = [];
    // Fill empty boxes at the beginning with days from the previous month
    const prevMonthLastDay = selectedDate.clone().subtract(1, 'month').endOf('month').format('D');
      for (let i = daysFromPrevMonth; i > 0; i--) {
      blanksAtStart.push(
        <td key={`prev-${i}`} className="calendar-day empty">
          <div className="day-container">
            <span className="day-number prev-month">{parseInt(prevMonthLastDay) - i + 1}</span>
          </div>
        </td>
      );
    }

    const daysInMonthCells = [];
    // Fill days of the current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = selectedDate.set('date', d).format('YYYY-MM-DD');
      // const dayEvents = events.filter(event => event.date === date);
      const dayEvents = eventList.filter(event => event.registration_deadline === date);
      console.log(dayEvents);


      const eventItems = dayEvents.map((event, index) => (
        // <div key={index} className="event" style={{ backgroundColor: event.color }}>
        <div key={index} className="event" style={{ backgroundColor: getBackgroundColor(event.event_type) }}>
          <a href={event.registration_link} className="event-link">{event.title}</a>
        </div>
      ));

      daysInMonthCells.push(
        <td key={date} className="calendar-day">
          <div className="day-container">
            {eventItems.length > 0 && <div className="event-container">{eventItems}</div>}
            <span className="day-number">{d}</span>
          </div>
        </td>
      );
    }

    const blanksAtEnd = [];
    // Fill remaining empty boxes at the end
    const daysFromNextMonth = totalBoxes - (blanksAtStart.length + daysInMonthCells.length);
    for (let i = 1; i <= daysFromNextMonth; i++) {
      blanksAtEnd.push(
        <td key={`next-${i}`} className="calendar-day empty">
          <div className="day-container">
            <span className="day-number prev-month">{i}</span>
          </div>
        </td>
      );
    }

    // Concatenate all cells
    const allCells = [...blanksAtStart, ...daysInMonthCells, ...blanksAtEnd];

    // Divide cells into rows
    const rows = [];
    for (let i = 0; i < allCells.length; i += 7) {
      rows.push(allCells.slice(i, i + 7));
    }

    return (
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row}</tr>
        ))}
      </tbody>
    );
  };
  return (
    <div style={{ display:"flex",height:"100vh"}}  >
      <Sidebar/> 
      <div className="main-container">
          <DashboardHeader/>
          <div className="page-address text-dark">Home / Calender</div>
          <div className="calendar-main-container">
              <div className="calendar-container container-fluid">
                <div className="calendar-toolbar">
                  <div className="legend">
                    <div className='fw-bold fs-5'><span className="legend-dot" style={{ backgroundColor: 'red' }}></span> Job's</div>
                    <div className='fw-bold fs-5'><span className="legend-dot" style={{ backgroundColor: 'blue' }}></span> Event's</div>
                    {/* Add more legend items as needed */}
                  </div>
                  <div className='year-button'>
                    <button onClick={() => changeDate(-1, 'year')}>&lt;</button>
                    <span  style={{ fontWeight: 'bold' }}>{selectedDate.format('YYYY')}</span>
                    <button onClick={() => changeDate(1, 'year')}>&gt;</button>
                  </div>
                  <div className='month-button'>
                    <button onClick={() => changeDate(-1, 'month')}>&lt;</button>
                    <span  style={{ fontWeight: 'bold' }}>{selectedDate.format('MMMM')}</span>
                    <button onClick={() => changeDate(1, 'month')}>&gt;</button>
                  </div>
                </div>
                <div className="calendar">
                  <table className="calendar-table">
                    <thead>
                      <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                      </tr>
                    </thead>
                    {renderDays()}
                  </table>
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Calender