import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        localStorage.setItem('recoil-persist', JSON.stringify({ memberInfo: null }));
        alert('세션이 만료되었습니다. 다시 로그인 해주세요');
        window.location.href = '/';
      }

    } else {
      console.log('네트워크 오류 또는 서버 응답 없음');
    }
    return Promise.reject(error);
  }
);

export default api;
