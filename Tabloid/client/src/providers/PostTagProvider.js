import React, {  useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
  const apiUrl = "/api/PostTag";
  const { getToken } = useContext(UserProfileContext);

  const addPostTag = (postTag) => {
    // debugger
    return getToken().then((token) => {
        // debugger
      fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
      })
    })
  };

  // Provider method to delete a post by sending a DELETE request based on a Post's ID
  // to the Web API with a firebase Token for authentication.
  const deletePostTag = (postId) => {
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
    <PostTagContext.Provider value={{ addPostTag, deletePostTag }}>
      {props.children}
    </PostTagContext.Provider>
  );
};