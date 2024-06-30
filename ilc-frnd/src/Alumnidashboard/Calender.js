import React, { useState } from 'react';
import moment from 'moment';
import '../Studentdashborad/styling/calendar.css'; // Import your CSS file for custom styling

const AlumniCalender=()=> {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events] = useState([
    { date: '2024-02-15', title: 'Student Job Affair', color: 'red', link: 'https://example.com/student-job-affair' },
    { date: '2024-02-20', title: 'Birthday Party', color: 'blue', link: 'https://example.com/birthday-party' },
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
      const dayEvents = events.filter(event => event.date === date);

      const eventItems = dayEvents.map((event, index) => (
        <div key={index} className="event" style={{ backgroundColor: event.color }}>
          <a href={event.link} className="event-link">{event.title}</a>
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
    <div style={{ display:"flex",height:"100vh",backgroundColor: "#007bff"}}  >
      <div className="side-container">
        <img src="/assets/COMSATS_new_logo-2.jpg" alt="Your" />
         <a href="/alumniboard">Home</a>
        <a href="/alumniprofile">Profile</a>
        <a href="/alumnievents">Events</a>
        <a href="/alumnicalender" className="calender">Calender</a>
        <a href="/alumnijobs" className="job-status">Job status</a>
        <a href="/alumninotifications" className="notification">Notification</a>
        <a href="/logout" className="logout">Log out</a>
      </div>
      <div className="main-container">
          <div className="top-container">
                <div className="dashboard-title text-dark">Alumni Dashboard</div>
                <div className="profile-info">
                <span className="text-dark">John Doe</span>
                <img src="/assets/th (7).jpeg" alt="Profile" />
                </div>
          </div>
          <div className="page-address text-dark">Home / Profile</div>
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
                  {/* <div>
                    <button onClick={() => changeDate(-1, 'week')}>&lt;</button>
                    <span>Week</span>
                    <button onClick={() => changeDate(1, 'week')}>&gt;</button>
                  </div> */}
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

export default AlumniCalender