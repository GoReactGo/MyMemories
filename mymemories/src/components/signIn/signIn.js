import React from 'react';
import { Link } from 'react-router-dom';
import styles from './signInStyle.module.css';

const SignIn = () => {
  const linkStyle = {
    color: '#1FB1F0', // Set the color you want for the links
    textDecoration: 'none', // Remove the underline
  };
  return (
    <div>
      <div id={styles.container} >
        <div id= {styles.leftBox}>
          <p>MY MEMORIES</p>
          <p className={styles.mainText} style={{marginTop: "3.2vw"}}
          >반갑습니다!</p>
          <p className={styles.mainText}><strong>MY MEMORIES</strong>에서</p>
          <p className={styles.mainText} style={{marginBottom: "6vw"}}>추억을 기억해보세요.</p>
          <div id={styles.linkBox}>
            <p style={{color: "#95969D", marginRight: "10px"}}>회원가입이 안되어있으신가요?</p>
            <p style={{color: "#1FB1F0"}}><Link to="/signup" style={linkStyle}>회원가입하기</Link></p>
          </div>
        </div>
        <div id= {styles.rightBox}>
            <p style={{fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            letterSpacing: "2.4px"}}>로그인</p>
          <div id={styles.idBox}style={{ marginTop: '40px', marginBottom: '20px' }}>
            <p>아이디</p>
            <input type='text' placeholder='아이디를 입력하세요'></input>
          </div>
          <div id={styles.pwBox} style={{ marginBottom: '50px' }}>
            <p>비밀번호</p>
            <input type='password' placeholder='비밀번호를 입력하세요'></input>
          </div>
          <button id={styles.signInBtn}>로그인 하기</button>
        </div>
      </div>
    </div> 
  );
};

export default SignIn;
