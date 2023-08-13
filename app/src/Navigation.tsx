import React from 'react';
import SignIn from './pages/SignIn';

export default function Navigation() {
  // 유저가 로그인 했다면
  // created At === updatedAt이라면 닉변 창
  // 아니라면 정상 창
  return <SignIn />;
}
