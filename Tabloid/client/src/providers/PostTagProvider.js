import React, {  useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
  const apiUrl = "/api/PostTag";
  const { getToken } = useContext(UserProfileContext);

  const addPostTag = (postTag) => {
    return getToken().then((token) => {
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

  /* Provider method to delete a post by sending a DELETE request based on a PostTag's ID to the Web API with a firebase Token for authentication. */
  const deletePostTag = (postTagId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${postTagId}`, {
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