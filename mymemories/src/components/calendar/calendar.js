import React, { useState } from 'react';
import './style.css';

function Calendar() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfWeek = getFirstDayOfWeek(currentDate.getFullYear(), currentDate.getMonth());

    const calendarDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(<div className="calendar-day" key={`day-${day}`}>{day}</div>);
    }

    return calendarDays;
  };

  return (
    <div className="App">
      
      <div className="calendar">
        <div className="header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h1>
            {currentDate.getFullYear()}{' '}
            <strong>{currentDate.toLocaleString('en-US', { month: 'long' })}{' '}</strong>
          </h1>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>
    </div>
  );
}

export default Calendar;