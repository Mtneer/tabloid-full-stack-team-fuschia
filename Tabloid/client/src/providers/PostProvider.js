import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const apiUrl = "/api/Post";
  const { getToken } = useContext(UserProfileContext);
  
  const [ posts, setPosts ] = useState([]);
  const [ myposts, setMyPosts ] = useState([]);

  const getAllPosts = () => {
    getToken().then((token) =>
        fetch(`${apiUrl}/GetAll`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setPosts);
  };
  
  const getUserPosts = () => {
    const UserProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    // debugger
    getToken().then((token) =>
        fetch(`${apiUrl}/MyPosts/${UserProfile.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setMyPosts);
  };

  const addPost = (post) => {
    getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error("Unauthorized");
    }));
  };

  return (
    <PostContext.Provider value={{ posts, myposts, getAllPosts, getUserPosts, addPost }}>
      {props.children}
    </PostContext.Provider>
  );
};