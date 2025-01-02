import React from 'react';
import CreateTravelPostForm from '../components/post/CreatePostForm';

const CreateTravelPostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
          <CreateTravelPostForm />
        </div>
      </div>
  );
};

export default CreateTravelPostPage;