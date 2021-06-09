import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import {PostObject} from "./Post";

export const PostList = () => {
  const {posts, getAll } = useContext(PostContext);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
            <PostObject key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};