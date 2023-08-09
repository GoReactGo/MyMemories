import React, { useState } from 'react';
import './style.css';

function Calendar() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  //요일 표시

  const [currentDate, setCurrentDate] = useState(new Date());
  //현재 날짜 상태?

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  //현재 달의 총 일수
  
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();
  //현재달의 첫번째 요일(0은 일요일 ~ 6은 토요일)

  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  }; //전달로 가는 버튼

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  }; //다음달로 가는 버튼



  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfWeek = getFirstDayOfWeek(currentDate.getFullYear(), currentDate.getMonth());

    const calendarDays = [];

    //이전달의 빈 날짜 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }
    //현재 달 날짜 추가
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