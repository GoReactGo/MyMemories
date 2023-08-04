import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth, db, storage, doc, setDoc, getDoc } from '../../firebase'; // Import Firebase settings
import styles from './signupStyle.module.css';
import userImg from '../../assets/signupUserImg.png';

const SignUp = () => {
  const linkStyle = {
    color: '#1FB1F0', // Set the color you want for the links
    textDecoration: 'none', // Remove the underline
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage)); // Store the URL of the selected image
      setImage(selectedImage); // Optionally store the selected image in the 'image' state if needed
    }
  };

  const handleCircleClick = () => {
    // 클릭 시 파일 선택 창 열기
    fileInputRef.current.click();
  };

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const saveUserData = async () => {
    try {
      // Firestore에 사용자 문서 생성
      const userDocRef = doc(db, 'user', id);
      await setDoc(userDocRef, {
        name: name,
        id: id,
        imageUrl: imageUrl,
        pw: pw,
      });

      console.log('회원가입 성공!');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isExistingId, setIsExistingId] = useState(false);

  const checkIdAvailability = async () => {
    // user 컬렉션에서 아이디가 존재하는지 확인하는 로직
    const userDocRef = doc(db, 'user', id);
    const userDocSnapshot = await getDoc(userDocRef);
    setIsIdAvailable(!userDocSnapshot.exists());
    setIsExistingId(userDocSnapshot.exists());
  };

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw); // 비밀번호 업데이트
    setConfirmPassword(pw); // 비밀번호 확인 입력 필드 업데이트
    setIsPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === pw);
  };

  const getButtonStyle = () => {
    if (isPasswordMatch && isIdAvailable && name !== '') {
      return {
        backgroundColor: '#17181A', // 버튼이 활성화된 경우의 배경색
        color: '#FFFFFF', // 버튼 텍스트 색상
      };
    } else {
      return {
        backgroundColor: '#FFFFFF', // 버튼이 비활성화된 경우의 배경색
        color: '#95969D', // 버튼 텍스트 색상
      };
    }
  };

  return (
    <div>
      <div id={styles.container}>
        <div id={styles.leftBox}>
          <p>MY MEMORIES</p>
          <p className={styles.mainText} style={{ marginTop: "3.2vw" }}>반갑습니다!</p>
          <p className={styles.mainText}><strong>MY MEMORIES</strong>에서</p>
          <p className={styles.mainText} style={{ marginBottom: "6vw" }}>추억을 기억해보세요.</p>
          <div id={styles.linkBox}>
            <p style={{ color: "#95969D", marginRight: "10px" }}>이미 회원가입이 되어있으신가요?</p>
            <p style={{ color: "#1FB1F0" }}><Link to="/signIn" style={linkStyle}>로그인하기</Link></p>
          </div>
        </div>

        <div id={styles.rightBox}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }} onClick={handleCircleClick}>
            {image ? (
              <img
                src={imageUrl}
                alt="선택한 이미지"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            ) : (
              <img style={{ width: '150px', height: '150px' }} src={userImg} alt="기본 이미지" />
            )}
          </div>
          <input type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={fileInputRef} />

          <div id={styles.nameBox} style={{ marginTop: '10px', marginBottom: '20px' }}>
            <p>이름</p>
            <input type='text' placeholder='실명을 입력해주세요.' value={name}
              onChange={(e) => setName(e.target.value)}></input>
          </div>

          <div id={styles.idBox} style={{ marginBottom: '20px' }}>
            <p>아이디</p>
            <input
              type='text'
              placeholder='아이디를 입력하세요'
              value={id}
              onChange={(e) => {
                const newId = e.target.value;
                setId(newId);
                setIsIdAvailable(false); // 아이디 입력이 변경되면 사용 가능 상태 초기화
              }}
              onBlur={() => {
                if (id.trim() !== '') {
                  checkIdAvailability();
                } else {
                  // id가 비어있는 경우 사용 불가능한 아이디로 처리
                  setIsIdAvailable(false);
                }
              }}
            />
            {isIdAvailable ? (
              <div className={styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#1FB1F0" /> {/* 아이디 사용 가능 색깔 */}
                  <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB" />
                </svg>
                <p style={{ color: '#1FB1F0' }}>사용 가능한 아이디입니다.</p> {/* 아이디 사용 가능 문구 */}
              </div>
            ) : 
            isExistingId ? (
              <div className={styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="red" /> {/* 아이디 사용 가능 색깔 */}
                  <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB" />
                </svg>
                <p style={{ color: 'red' }}>사용 불가능한 아이디입니다.</p> {/* 아이디 사용 가능 문구 */}
              </div>
            ) :
            null
            }
          </div>

          <div id={styles.pwBox} style={{ marginBottom: '20px' }}>
            <p>비밀번호</p>
            <input type='password' placeholder='비밀번호를 입력해주세요.' value={pw} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div id={styles.pwCheckBox} style={{ marginBottom: '30px' }}>
            <p>비밀번호 확인</p>
            <input type='password' placeholder='비밀번호를 입력해주세요.' value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => setIsPasswordMatch(pw === confirmPassword)}
            ></input>
            {isPasswordMatch ? (
              <div className={styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#1FB1F0" /> {/* 비밀번호 일치 색깔 */}
                  <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB" />
                </svg>
                <p style={{ color: '#1FB1F0' }}>비밀번호가 일치합니다.</p> {/* 비밀번호 일치 문구 */}
              </div>
            ) : (
              <div className={styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="red" /> {/* 비밀번호 일치 색깔 */}
                  <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB" />
                </svg>
                <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p> {/* 비밀번호 일치 문구 */}
              </div>
            )}
          </div>
          <button onClick={saveUserData} id={styles.signInBtn} style={getButtonStyle()} >회원가입 하기</button>
        </div>
      </div>
    </div>
  )
};

export default SignUp;

