import React, { useState } from 'react';
import { getMember, updateMember } from '../../services/api';

const ProfileEditForm: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const fetchUserInfo = async () => {
    try {
      const response = await getMember();
      if (response) {
        setNickname(response.result.nickname);
        setEmail(response.result.email);
      } else {
        alert("사용자 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // 컴포넌트가 마운트될 때 바로 사용자 정보를 불러옴
  React.useLayoutEffect(() => {
    fetchUserInfo();
  }, []);


  const handleUpdate = async () => {
    try {
      await updateMember(nickname);
      alert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      alert('회원 정보 수정에 실패했습니다.');
    }
  };

  return (
    <form className="space-y-6 mb-10">
      <h1 className="text-2xl font-bold text-center mb-4">정보 수정</h1>

      <div className="mb-4">
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
          닉네임
        </label>
        <div className="mt-1">
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일 주소
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            readOnly
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-100 focus:outline-none sm:text-sm"
          />
        </div>
      </div>

      {/* 정보 수정 버튼 */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleUpdate}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          회원 정보 수정
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
