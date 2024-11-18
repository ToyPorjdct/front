import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../../types/PostForm.d';
import { createPost } from '../../services/postApi';
import { useRecoilState } from 'recoil';
import { memberInfo } from '../../state/authState';

const CreateTravelPostForm: React.FC = () => {
  const [auth] = useRecoilState(memberInfo);

  const [postForm, setPost] = useState<PostForm>({
    title: '',
    description: '',
    destination: '',
    maxParticipant: 0,
    startDate: '',
    endDate: '',
    tagNames: [],
  });

  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: name === 'maxParticipant' ? parseInt(value) : value,
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && !postForm.tagNames.includes(tagInput)) {
      setPost(prevPost => ({
        ...prevPost,
        tagNames: [...prevPost.tagNames, tagInput],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setPost(prevPost => ({
      ...prevPost,
      tagNames: prevPost.tagNames.filter(t => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDate = new Date(postForm.startDate).toISOString();
    const endDate = new Date(postForm.endDate).toISOString();

    try {
      await createPost(auth.accessToken, {
        ...postForm,
        startDate,
        endDate,
      });
      alert('게시글이 성공적으로 작성되었습니다!');
      navigate('/posts');
    } catch (error) {
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 shadow-md rounded-lg max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">여행 모집글 작성</h1>
        <p className="text-gray-600 mt-2">여행 계획을 공유하고 동행을 모집해보세요!</p>
      </div>

      {/* 제목 */}
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-800">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={postForm.title}
          onChange={handleChange}
          required
          placeholder="예: 제주도 여행 동행 모집합니다!"
          className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      {/* 목적지 */}
      <div>
        <label htmlFor="destination" className="block text-lg font-medium text-gray-800">목적지</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={postForm.destination}
          onChange={handleChange}
          required
          placeholder="예: 제주도, 부산, 일본 등"
          className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-lg font-medium text-gray-800">출발 날짜</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={postForm.startDate}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-lg font-medium text-gray-800">종료 날짜</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={postForm.endDate}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      {/* 최대 참가자 수 */}
      <div>
        <label htmlFor="maxParticipant" className="block text-lg font-medium text-gray-800">최대 참가자 수</label>
        <select
          id="maxParticipant"
          name="maxParticipant"
          value={postForm.maxParticipant}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>{num}명</option>
          ))}
        </select>
      </div>

      {/* 내용 */}
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-800">내용</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={postForm.description}
          onChange={handleChange}
          required
          placeholder="여행 일정, 동행 조건 등을 자세히 적어주세요!"
          className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      {/* 태그 입력 */}
      <div>
        <label htmlFor="tagNames" className="block text-lg font-semibold text-gray-800 mb-2">태그 추가</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="tagNames"
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="태그를 입력하세요"
            className="w-full rounded-l-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-6 py-2 bg-gray-500 text-white rounded-r-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            +
          </button>
        </div>
        <div className="mt-2">
          {postForm.tagNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {postForm.tagNames.map((tagNames, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm flex items-center space-x-2">
                  <span>{tagNames}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tagNames)}
                    className="text-xs text-blue-500 hover:text-blue-700 transition-all duration-200">
                    X
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
          작성 완료
        </button>
      </div>
    </form>
  );
};

export default CreateTravelPostForm;
