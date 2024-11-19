import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../services/postApi';
import TravelPostDetail from '../components/post/PostDetail';
import Comments from '../components/post/Comment';
import { PostDetailType } from '../types/PostDetailType';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: '여행자A',
      content: '정말 멋진 여행 계획이네요! 저도 참여하고 싶어요.',
      createdAt: '2023-07-02T10:30:00Z',
    },
    {
      id: 2,
      author: '제주도민B',
      content: '제주도 현지인입니다. 좋은 장소 추천해 드릴 수 있어요!',
      createdAt: '2023-07-03T14:15:00Z',
    },
  ]);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        if (id) {
          const postData = await getPostDetail(Number(id));
          setPost(postData.result);
          setLoading(false);
        }
      } catch (error) {
        setError('게시글을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  // 로딩 중에는 로딩 메시지 또는 로딩 스피너를 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러가 발생한 경우 오류 메시지를 표시
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        {/* 게시글이 로딩된 경우에만 TravelPostDetail을 렌더링 */}
        {post && <TravelPostDetail post={post} />}
        
        {/* 댓글이 로딩되었으므로, 기본 댓글 데이터를 렌더링 */}
        {comments.length > 0 && <Comments postId={post?.id ?? 0} comments={comments} />}
      </div>
    </div>
  );
};

export default PostDetailPage;
