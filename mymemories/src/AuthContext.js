import React, { createContext, useContext, useState } from 'react';

// AuthContext를 생성합니다.
const AuthContext = createContext();

// AuthProvider 컴포넌트를 생성합니다.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 커스텀 훅을 생성하여 AuthContext를 사용할 수 있도록 합니다.
export const useAuth = () => {
  return useContext(AuthContext);
};