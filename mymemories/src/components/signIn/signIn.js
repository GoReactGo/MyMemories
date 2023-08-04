import React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db, doc,getDoc } from '../../firebase';
import styles from './signInStyle.module.css';

const SignIn = () => {
  const linkStyle = {
    color: '#1FB1F0', // Set the color you want for the links
    textDecoration: 'none', // Remove the underline
  };

  const [id, setId] = useState('');
  const [pw, setPassword] = useState('');

  const handleLogin = async () =>{
    try{
      const userDocRef = doc(db,'user',id);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        if (userData.pw === pw) {
          console.log('로그인 성공!');
          // 여기에 로그인 성공 시 처리할 로직 추가
        } else {
          console.log('비밀번호가 일치하지 않습니다.');
        }
      } else {
        console.log('해당 아이디의 사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  const isFieldsNotEmpty = () => {
    return id.trim() !== '' && pw.trim() !== '';
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
            <input type='text' placeholder='아이디를 입력하세요' value={id} onChange={(e) => setId(e.target.value)}></input>
          </div>
          <div id={styles.pwBox} style={{ marginBottom: '50px' }}>
            <p>비밀번호</p>
            <input type='password' placeholder='비밀번호를 입력하세요' value={pw} onChange={(e) => setPassword(e.target.value)} ></input>
          </div>
          <button id={styles.signInBtn} onClick={handleLogin} style={{ backgroundColor: isFieldsNotEmpty() ? '#17181A' : '#FFFFFF' , color: isFieldsNotEmpty() ? '#FFFFFF' : '#95969D'}} 
            disabled={!isFieldsNotEmpty()}>로그인 하기</button>
        </div>
      </div>
    </div> 
  );
};

export default SignIn;
