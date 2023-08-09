import React, { useState } from 'react';
import styles from './calendar.module.css';
import { weeksToDays } from 'date-fns';


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
      calendarDays.push(<div className={styles.emptyDay} key={`empty-${i}`}></div>);
    }
    //현재 달 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(<div className={styles.calendarDay} key={`day-${day}`}>{day}</div>);
    }

    return calendarDays;
  };
  
  return (
    <div className={styles.App}>
      <div className={styles.topBox}>
        <p className={styles.projectName}>MY MEMORIES</p>
        <p className={styles.profile}>엠엠님|로그아웃</p>
      </div>
      <div className={styles.calendarList}>
          <button className={styles.calendarItem}>공유 캘린더 1</button>
          <button className={styles.calendarItem}>공유 캘린더 2</button>
          <button className={styles.calendarItem}>공유 캘린더 3</button>
          <button className={styles.calendarItem}>공유 캘린더 4</button>
          <button className={styles.calendarItem}>한성 19학번 추억들</button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <button onClick={handlePrevMonth}><h1>&lt;</h1></button>
          <h1 className={styles.date}>
            {currentDate.getFullYear()}{' '}
            <strong>{currentDate.toLocaleString('en-US', { month: 'long' })}{' '}</strong>
          </h1>
          <button onClick={handleNextMonth}><h1>&gt;</h1></button>
        </div>
        <div className={styles.optionBox}>
          <button className={styles.option}>사진추가</button>
          <button className={styles.option}>친구id</button> 
          <button className={styles.option}>커스텀</button>
        </div>
        <div className={styles.daysOfWeek}>
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className={styles.calendarGrid}>{renderCalendar()}</div>
      </div>
      <div id={styles.bottomBox}>
        <div>
          <p className={styles.projectName}>MY MEMORIES</p>
        </div>
        <div>
          <div className={styles.university}>한성대학교</div>
          <div calssName={styles.university}>서울특별시 성북구 삼선교로 16길(삼선동2가) 116 한성대학교</div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;