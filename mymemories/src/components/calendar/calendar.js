import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // 앞서 생성한 Firebase 초기화 파일 경로
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './calendar.module.css';
import InviteModal from './InviteModal';
import CustomModal from './customModal';
import axios from 'axios';
import Sunny from '../../assets/weatherimg/Sunny.png';
import Cloudy from '../../assets/weatherimg/Cloudy.png';
import Snow from '../../assets/weatherimg/Snow.png';
import Rainy from '../../assets/weatherimg/Rainy.png';

const apiKey = '21436169b59984e5c7012ce01f551d90'; // OpenWeatherMap에서 발급받은 API 키로 대체
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const seoulLat = 37.5665;
const seoulLon = 126.9780;
const forecastDays = 56; // 가져올 예보 일 수

const Calendar = () => {
    const getWeather = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}?lat=${seoulLat}&lon=${seoulLon}&cnt=${forecastDays}&appid=${apiKey}&units=metric`); // API 엔드포인트 변경
        const data = await response.data;
        //console.log('API Response:', data); // API 응답 데이터 확인
        setWeatherData(data.list); // 일일 예보 데이터 리스트를 저장
      } catch (error) {
        console.error('Weather API Error:', error);
      }
    };

    useEffect(() => {
      getWeather();
    }, []);

    const { user, logout } = useAuth(); // 로그인된 사용자 정보와 logout 함수 불러오기 위함
    console.log('User:', user);

    const navigate = useNavigate();
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

    // 친구 초대 & 커스텀 모달
    const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);
    const [customModalIsOpen, setCustomModalIsOpen] = useState(false);
    const [isButtonHighlighted, setIsButtonHighlighted] = useState(false); // 버튼 하이라이트 상태

    const openInviteModal = () => {
        setInviteModalIsOpen(true);
        setIsButtonHighlighted(true); 
    };

    const closeInviteModal = () => {
        setInviteModalIsOpen(false);
        setIsButtonHighlighted(false);
    };

    const openCustomModal = () => {
        setCustomModalIsOpen(true);
        setIsButtonHighlighted(true); 
    };

    const closeCustomModal = () => {
        setCustomModalIsOpen(false);
        setIsButtonHighlighted(false);
    };

    // 친구 추가
    const handleAddFriend = (email) => {
      // friendEmail을 처리하거나 서버로 전송하는 로직 구현
      console.log('Added friend with email:', email);
    };

    const [selectedColor, setSelectedColor] = useState('');

    const handleColorSelect = (color) => {
      setSelectedColor(color);
    };

    // 로컬 스토리지에서 배경색 가져오기
    useEffect(() => {
      const storedColor = localStorage.getItem('selectedColor');
      if (storedColor) {
        setSelectedColor(storedColor);
        document.body.style.backgroundColor = storedColor; // 전체 화면 배경에 색상 적용
      }
    }, []);

    // 공유 캘린더 내용 가져오기
    // const [sharedCalendars, setSharedCalendars] = useState([]);

    // useEffect(() => {
    //   const fetchSharedCalendars = async () => {
    //     try {
    //       const calendarsRef = collection(db, 'sharedCalendars');
    //       const querySnapshot = await getDocs(calendarsRef);
    // const [weatherData, setWeatherData] = useState([]);

    // const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    // //현재 달의 총 일수
    
    //         const sharedCalendarsData = [];
    //         querySnapshot.forEach((doc) => {
    //           sharedCalendarsData.push({ id: doc.id, ...doc.data() });
    //         });
    
    //         setSharedCalendars(sharedCalendarsData);
    //       } catch (error) {
    //         console.error('Error fetching shared calendars:', error);
    //       }
    //     };
    
    //     fetchSharedCalendars();
    //   }, [db]);

    if (!user) {
      document.body.style.backgroundColor = ''; // 전체 화면 배경 초기화
      navigate('/signIn');
      return null;
    }

    // 로그아웃 처리 함수
    const handleLogout = async () => {
      try {
        await logout(); // 로그아웃 실행
        handleColorSelect(''); // 배경색 초기화
        document.body.style.backgroundColor = ''; // 전체 화면 배경 초기화
        navigate('/signIn');
        return null;
      } catch (error) {
        console.error('로그아웃 에러:', error);
      }
    };

    const selectIcon = (iconId) => {
      if (iconId >= 800 && iconId < 900) {
        // 맑음
        return <img src={Sunny} alt="Sunny" style={{ width: '6rem', color: 'red' }} />;
      } else if (iconId >= 600 && iconId < 700) {
        // 눈
        return <img src={Snow} alt="Snow" style={{ width: '6rem', color: 'white' }} />;
      } else if (iconId >= 500 && iconId < 600) {
        // 비
        return <img src={Rainy} alt="Rainy" style={{ width: '6rem', color: 'navy' }} />;
      } else {
        // 구름
        return <img src={Cloudy} alt="Cloudy" style={{ width: '6rem', color: 'white' }} />;
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
        
        const dayWeather = weatherData.filter(item => item.dt_txt.startsWith(dateKey));
        let hasCloudy = false;
        let hasRainy = false;
        let hasSnow = false;
        let hasSunny = false;

        for (const hourWeather of dayWeather) {
          const iconId = hourWeather.weather[0].id;
          if (iconId >= 800 && iconId < 900) {
            hasSunny = true;
          } else if (iconId >= 600 && iconId < 700) {
            hasSnow = true;
          } else if (iconId >= 500 && iconId < 600) {
            hasRainy = true;
          } else {
            hasCloudy = true;
          }
        }

        let weatherIcon = null;
        if (hasRainy) {
          weatherIcon = selectIcon(500); // Rainy
        } else if (hasSnow) {
          weatherIcon = selectIcon(600); // Snow
        } else if (hasCloudy) {
          weatherIcon = selectIcon(801); // Cloudy (주로 부분적 구름)
        } else if (hasSunny) {
          weatherIcon = selectIcon(800); // Sunny
        }
        
        calendarDays.push(
          <div className={styles.calendarDay} key={`day-${day}`}>
            {day}
            <div className={styles.icon}>
              {weatherIcon ? weatherIcon : null} {/* 날씨 정보가 없는 경우에는 null */}
            </div>
          </div>
        );
      }
    
      return calendarDays;
    };
    
    
  return (
    <div className={styles.App}>
      <div className={styles.topBox}>
        <p className={styles.projectName} onClick={() => navigate('/')}>MY MEMORIES</p>
       
        <div className={styles.rightTop}>
        {user.imageUrl && <img className={styles.profileImage} src={user.imageUrl} alt="프로필 이미지" />}
        <p className={styles.profile}>
          <span className={styles.profileName}>{user.name}</span>님  |  <span onClick={handleLogout} className={styles.logout}>로그아웃</span>
        </p>
        </div>
        
      </div>
      <div className={styles.calendarList}>
      {/* {sharedCalendars.map((calendar) => (
        <button key={calendar.id} className={styles.calendarItem}>
          {calendar.name}
        </button>
      ))} */}
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
        <button className={isButtonHighlighted ? 'highlightedButton' : 'option'} onClick={openInviteModal}>
          친구 ID 추가
        </button>
        <button className={isButtonHighlighted ? 'highlightedButton' : 'option'} onClick={openCustomModal}>
          커스텀
        </button>
      </div>
      {inviteModalIsOpen && (
        <InviteModal isOpen={inviteModalIsOpen} closeModal={closeInviteModal} />
      )}
      {customModalIsOpen && (
        <CustomModal isOpen={customModalIsOpen} closeModal={closeCustomModal} onColorSelect={handleColorSelect}/>
      )}
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
