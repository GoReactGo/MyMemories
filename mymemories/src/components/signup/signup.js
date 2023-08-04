import React from 'react';
import { Link } from 'react-router-dom';

import { useState, useRef } from 'react';
import styles from './signupStyle.module.css';
import userImg from '../../assets/signupUserImg.png';

const SignUp = () => {
  const linkStyle = {
    color: '#1FB1F0', // Set the color you want for the links
    textDecoration: 'none', // Remove the underline
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 필요한 경우 선택한 이미지 처리 (크기 조정, 유효성 검사 등)
      setSelectedImage(file);
    }
  };

  const handleCircleClick = () => {
    // 클릭 시 파일 선택 창 열기
    fileInputRef.current.click();
  };

  return (
    <div>
      <div id={styles.container}>
        <div id={styles.leftBox}>
          <p>MY MEMORIES</p>
          <p className={styles.mainText} style={{marginTop: "3.2vw"}}
          >반갑습니다!</p>
          <p className={styles.mainText}><strong>MY MEMORIES</strong>에서</p>
          <p className={styles.mainText} style={{marginBottom: "6vw"}}>추억을 기억해보세요.</p>
          <div id={styles.linkBox}>
            <p style={{color: "#95969D", marginRight: "10px"}}>이미 회원가입이 되어있으신가요?</p>
            <p style={{color: "#1FB1F0"}}><Link to="/signIn" style={linkStyle}>로그인하기</Link></p>
          </div>
        </div>

        <div id={styles.rightBox}>
          {/* <p style={{fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            letterSpacing: "2.4px"}}>회원가입</p> */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'}} onClick={handleCircleClick}>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="선택한 이미지"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />) : (<img style={{ width: '150px', height: '150px'}} src={userImg}></img>)}
          </div>
          <input type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={fileInputRef}/>
          <div id={styles.nameBox}style={{ marginTop: '10px', marginBottom: '20px' }}>
            <p>이름</p>
            <input type='text' placeholder='실명을 입력해주세요.'></input>
          </div>
          <div id={styles.idBox}style={{ marginBottom: '20px' }}>
            <p>아이디</p>
            <input type='text' placeholder='아이디를 입력해주세요.'></input>
            <div className={styles.check}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#95969D"/>
                <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB"/>
              </svg>
              <p>사용가능한 아이디입니다.</p>
            </div>
          </div>
          <div id={styles.pwBox}style={{ marginBottom: '20px' }}>
            <p>비밀번호</p>
            <input type='password' placeholder='비밀번호를 입력해주세요.'></input>
            <div className={styles.check}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#95969D"/>
                <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB"/>
              </svg>
              <p>사용가능한 비밀번호입니다.</p>
            </div>
          </div>
          <div id={styles.pwCheckBox} style={{ marginBottom: '30px' }}>
            <p>비밀번호 확인</p>
            <input type='password' placeholder='비밀번호를 입력해주세요.'></input>
            <div className={styles.check}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#95969D"/>
                <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB"/>
              </svg>
              <p>비밀번호가 일치합니다.</p>
            </div>
          </div>
          <button id={styles.signInBtn}>회원가입 하기</button>
        </div>
      </div>
    </div> 
  )
};

export default SignUp;
