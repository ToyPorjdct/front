import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail, getComments } from '../services/postApi';
import TravelPostDetail from '../components/post/PostDetail';
import Comments from '../components/post/Comment';
import { CommentType } from '../types/CommentType';
import { PostDetailType } from '../types/PostDetailType';

const PostDetailPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingPost, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        if (boardId) {
          const postData = await getPostDetail(Number(boardId));
          setPost(postData.result);
        }
      } catch (err) {
        setError('게시글을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [boardId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        if (boardId) {
          const commentsData = await getComments(Number(boardId));
          setComments(commentsData.result);
        }
      } catch (err) {
        setError('댓글을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [boardId]);

  if (loadingPost) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        {post && <TravelPostDetail post={post} />}
        {post && (<Comments comments={comments} postAuthorId={post.author.id} boardId={Number(boardId)} />)}
      </div>
    </div>
  );
};

export default PostDetailPage;
