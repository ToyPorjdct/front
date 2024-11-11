// src/atoms/authState.ts
import { atom } from 'recoil';

export const authState = atom<boolean>({
  key: 'authState', // 각 atom의 고유한 key
  default: !!localStorage.getItem('token'), // 초기 값은 localStorage에 토큰이 있는지 여부로 설정
});

