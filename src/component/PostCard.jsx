import React from 'react';
import appWriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ post }) {  

  if (!post || !post.$id) {
      console.error("PostCard Error: Missing post ID", post);
      return null;
  }

  return (
      <Link to={`/post/${post.$id}`}>
          <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full flex justify-center mb-4 h-[500px]">
                {post.featuredImage ? (
                    <img
                        src={appWriteService.getFilePreview(post.featuredImage)}
                        alt="Post Preview"
                        className="w-full h-full object-contain rounded-xl"
                    />
                ) : (
                    <p>No Image Available</p>
                )}
            </div>
              <h2 className="text-xl font-bold text-black">{post.title || "Untitled Post"}</h2>
          </div>
      </Link>
  );
}

export default PostCard;
