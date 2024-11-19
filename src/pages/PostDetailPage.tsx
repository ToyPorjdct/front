import React from 'react';
import { useParams } from 'react-router-dom';
import TravelPostDetail from '../components/post/PostDetail';
import Comments from '../components/post/Comment';

interface TravelPost {
  id: number;
  title: string;
  author: {
    name: string;
    profileImage: string;
  };
  createdAt: string;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  content: string;
  views: number;
  likes: number;
  tags: string[];
  image: string;
  destination: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const post: TravelPost = {
    id: 1,
    title: "제주도 힐링 여행",
    author: {
      name: "제주사랑",
      profileImage: "https://via.placeholder.com/40",
    },
    createdAt: "2023-07-01",
    maxParticipants: 5,
    currentParticipants: 3,
    startDate: "2023-08-15",
    endDate: "2023-08-18",
    content: "아름다운 제주도에서 4일간의 힐링 여행을 떠나요. 올레길 트레킹, 맛있는 해산물 요리, 그리고 아름다운 해변에서의 휴식이 기다리고 있습니다. 함께 제주도의 아름다움을 만끽하고 잊지 못할 추억을 만들어보아요!",
    views: 120,
    likes: 15,
    tags: ["제주도", "힐링", "트레킹", "해변"],
    image: "/placeholder.svg?height=400&width=800",
    destination: "제주도",
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: "여행자A",
      content: "정말 멋진 여행 계획이네요! 저도 참여하고 싶어요.",
      createdAt: "2023-07-02T10:30:00Z",
    },
    {
      id: 2,
      author: "제주도민B",
      content: "제주도 현지인입니다. 좋은 장소 추천해 드릴 수 있어요!",
      createdAt: "2023-07-03T14:15:00Z",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        <TravelPostDetail post={post} />
        <Comments postId={post.id} comments={comments} />
      </div>
    </div>
  );
};

export default PostDetailPage;