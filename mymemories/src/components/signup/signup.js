import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage, doc, setDoc, getDoc } from '../../firebase'; // Import Firebase settings
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './signupStyle.module.css';
import userImg from '../../assets/signupUserImg.png';

const SignUp = () => {
  const linkStyle = {
    color: '#1FB1F0', // Set the color you want for the links
    textDecoration: 'none', // Remove the underline
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 이미지를 업로드하고 이미지 URL을 반환하는 함수
  const uploadImage = async (selectedImage) => {
    try {
      const storageRef = ref(storage, 'images/' + selectedImage.name);
      await uploadBytes(storageRef, selectedImage);
    
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl; // 이미지 URL을 반환
    } catch (error) {
      console.error('이미지 업로드 에러:', error);
      throw error; // 오류를 다시 throw하여 상위 함수에서 처리할 수 있게 합니다.
    }
  };

  // 파일 선택 시 호출되는 함수
  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      try {
        const imageUrl = await uploadImage(selectedImage); // 이미지 업로드 함수 호출

        setSelectedImage(imageUrl);
        setImageUrl(imageUrl);
        console.log('이미지 URL:', imageUrl); // 이미지 URL을 콘솔에 출력
      } catch (error) {
        console.error('이미지 업로드 에러:', error);
      }
    }
  };

  const handleCircleClick = () => {
    // 클릭 시 파일 선택 창 열기
    fileInputRef.current.click();
  };

  const saveUserDataClick = () => {
    saveUserData(name, email, pw, image);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState(" ");

  const saveUserData = async (name, email, pw, image) => {
    try {
      setErrorMsg(' ');
      // Firebase Authentication을 사용하여 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
      const user = userCredential.user;
      // const imageUrl = await uploadImage(image);

      // 이름, 프로필 이미지 업데이트
      await updateProfile(user, {
        displayName: name,
        photoURL: image // 프로필 이미지 URL
      });

      // Firestore에 사용자 정보 저장
      const userDocRef = doc(db, 'user', email);

      await setDoc(userDocRef, {
        name: name,
        id: email,
        imageUrl: imageUrl,
        pw: pw,
      });
      console.log('회원가입 성공:', user);
      navigate('/signIn');
      return user;
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setErrorMsg('비밀번호는 6자리 이상이어야 합니다');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('잘못된 이메일 주소입니다');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('이미 가입되어 있는 계정입니다');
      }
      console.error('회원가입 에러:', error);
    }
  };

  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isExistingEmail, setIsExistingEmail] = useState(false);

  const checkEmailAvailability = async () => {
    // user 컬렉션에서 이메일이 존재하는지 확인하는 로직
    const userDocRef = doc(db, 'user', email);
    const userDocSnapshot = await getDoc(userDocRef);
    setIsEmailAvailable(!userDocSnapshot.exists());
    setIsExistingEmail(userDocSnapshot.exists());
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
    if (isPasswordMatch && isEmailAvailable && name !== '') {
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
            {selectedImage ? (
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
            <p>이메일</p>
            <input
              type='text'
              placeholder='이메일을 입력하세요'
              value={email}
              onChange={(e) => {
                const newEmail = e.target.value;
                setEmail(newEmail);
                setIsEmailAvailable(false); // 아이디 입력이 변경되면 사용 가능 상태 초기화
              }}
              onBlur={() => {
                if (email.trim() !== '') {
                  checkEmailAvailability();
                } else {
                  // id가 비어있는 경우 사용 불가능한 아이디로 처리
                  setIsEmailAvailable(false);
                }
              }}
            />
            {isEmailAvailable ? (
              <div className={styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#1FB1F0" /> {/* 이메일 사용 가능 색깔 */}
                  <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB" />
                </svg>
                <p style={{ color: '#1FB1F0' }}>사용 가능한 이메일입니다.</p> {/* 이메일 사용 가능 문구 */}
              </div>
            ) : 
            isExistingEmail ? (
              <div className={styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="red" /> {/* 이메일 사용 가능 색깔 */}
                  <path d="M7.81818 12.3284L4.95455 9.8209L4 10.6567L7.81818 14L16 6.83582L15.0455 6L7.81818 12.3284Z" fill="#F6F7FB" />
                </svg>
                <p style={{ color: 'red' }}>사용 불가능한 이메일입니다.</p> {/* 이메일 사용 가능 문구 */}
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
          <button onClick={saveUserDataClick} id={styles.signInBtn} style={getButtonStyle()} >회원가입 하기</button>
        </div>
      </div>
    </div>
  )
};

export default SignUp;

