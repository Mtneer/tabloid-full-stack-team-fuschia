import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

    const getAllPublishedPosts = () => {
    return fetch("/api/post/getAllPublishedPosts")
      .then((res) => res.json())
      .then(setPosts);
  };

  
  
  return (
    <PostContext.Provider value={{ posts, getAllPublishedPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};