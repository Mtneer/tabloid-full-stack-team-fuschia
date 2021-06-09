import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

    const getAll = () => {
    return fetch("/api/post/GetAll")
      .then((res) => res.json())
      .then(setPosts);
  };

  
  
  return (
    <PostContext.Provider value={{ posts, getAll }}>
      {props.children}
    </PostContext.Provider>
  );
};