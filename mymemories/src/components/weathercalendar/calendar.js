import React, { useState, useEffect } from 'react';
import styles from './calendar.module.css';
import axios from 'axios';
import {
  Sunny, Cloudy, Rainy, Snow
} from '../../assets/weatherimg/';


const apiKey = '4d445d9cd6aab6eef5984279bf27548f'; // OpenWeatherMap에서 발급받은 API 키로 대체
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const seoulLat = 37.5665;
const seoulLon = 126.9780;
const forecastDays = 16; // 가져올 예보 일 수

function Calendar() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  //요일 표시

  const [currentDate, setCurrentDate] = useState(new Date());
  //현재 날짜 상태?

  const [weatherData, setWeatherData] = useState([]);

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

  const getWeather = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}?lat=${seoulLat}&lon=${seoulLon}&cnt=${forecastDays}&appid=${apiKey}&units=metric`); // URL 변경
      const data = await response.json();
      //console.log('API Response:', data); // API 응답 데이터 확인
      setWeatherData(data.list); // 일일 예보 데이터 리스트를 저장
    } catch (error) {
      console.error('Weather API Error:', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const selectIcon = (iconId, dayWeather) => {
    console.log('Selected Icon ID:', iconId); // 선택된 아이콘 아이디를 콘솔에 출력
    
    if (iconId >= 800 && iconId < 900) {
      // 맑음
      return <Sunny size="6rem" color="red" />;
    } else if (iconId >= 600 && iconId < 700) {
      // 눈
      return <Snow size="6rem" color="white" />;
    } else if (iconId >= 500 && iconId < 600) {
      // 비
      return <Rainy size="6rem" color="navy" />;
    } else {
      // 구름
      return <Cloudy size="6rem" color="white" />;
    }
  };

  const renderCalendar = () => {
    if (!weatherData || weatherData.length === 0) {
      return null; // 데이터 로드 전에는 아무것도 렌더링하지 않음
    }
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfWeek = getFirstDayOfWeek(currentDate.getFullYear(), currentDate.getMonth());
    
    const calendarDays = [];
  
    // 이전달의 빈 날짜 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div className={styles.emptyDay} key={`empty-${i}`}></div>);
    }
    
    // 현재 달 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, '0');
      const dayOfMonth = String(day).padStart(2, '0');
      const dateKey = `${year}-${month}-${dayOfMonth}`;
      //console.log('Date Key:', dateKey);
      //console.log('dayWeather:', dayWeather);

      const dayWeather = weatherData.find(item => item.dt_txt.startsWith(dateKey));      let weatherIcon = null;
      console.log('Date Key:', dateKey, 'dayWeather:', dayWeather);
      
      if (dayWeather && dayWeather.weather[0]) {
        const iconId = dayWeather.weather[0].id;
        weatherIcon = selectIcon(iconId, dayWeather); // dayWeather를 전달
      } else {
        // 예보 데이터가 없는 경우에도 빈 아이콘을 추가
        weatherIcon = selectIcon(-1, dayWeather); // -1을 특별한 아이콘으로 처리할 수 있도록 해야합니다.
      }
    
      calendarDays.push(
        <div className={styles.calendarDay} key={`day-${day}`}>
          {day}
          <div className={styles.icon}>{weatherIcon}</div>
        </div>
      );
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
          <div className={styles.university}>서울특별시 성북구 삼선교로 16길(삼선동2가) 116 한성대학교</div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;