import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore의 doc 및 getDoc 함수 불러오기
import { db } from './firebase';

// AuthContext 생성
const AuthContext = createContext();

// 커스텀 훅을 생성하여 AuthContext를 사용할 수 있도록 함
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDocRef = doc(db, 'users', authUser.email); // 사용자 문서 참조
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUser({
              email: authUser.email,
              pw: authUser.pw,
              name: userData.name, // 사용자 이름 추가
              imageUrl: userData.imageUrl // 이미지 URL 추가
            });
          }
        } catch (error) {
          console.error('사용자 정보 불러오기 에러:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = (userData) => {
    setUser({
      email: userData.id, // 사용자 이메일
      pw: userData.pw,
      name: userData.name, // 사용자 이름
      imageUrl: userData.imageUrl // 사용자 이미지 URL
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  // 사용자 상태 변화 감지
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // 사용자가 로그인한 경우: 세션 상태 저장
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // 사용자가 로그아웃한 경우: 세션 상태 제거
      localStorage.removeItem('user');
    }
  });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};