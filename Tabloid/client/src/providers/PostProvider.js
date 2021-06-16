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
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setPosts);
  };
  
  // Provider method to retrieve all of the posts authored by the current user 
  // by sending a GET request based on the Current User's ID
  // to the Web API with a firebase Token for authentication.
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
    // debugger
    return getToken().then((token) =>
      fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
          }))
          .then(resp => resp.json())
  };

  const getPostById = (postId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(resp => resp.json())    
  }

  // Provider method to edit a post by sending a PUT request based on a Post Object
  // to the Web API with a firebase Token for authentication.
  const editPost = (post) => {
    // debugger
    return getToken().then((token) => {
        // debugger
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
    })});
  };

  // Provider method to delete a post by sending a DELETE request based on a Post's ID
  // to the Web API with a firebase Token for authentication.
  const deletePost = (postId) => {
    getToken().then((token) =>
        fetch(`${apiUrl}/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
    }));
  };

  return (
    <PostContext.Provider value={{ posts, myposts, getAllPosts, getPostById, getUserPosts, addPost, editPost, deletePost }}>
      {props.children}
    </PostContext.Provider>
  );
};