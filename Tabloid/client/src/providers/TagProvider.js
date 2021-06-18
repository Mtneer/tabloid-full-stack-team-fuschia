import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/Tag";
  const { getToken } = useContext(UserProfileContext);

  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resp => resp.json())
      .then(setTags)
    );
    }

    const addTag = (tag) => {
      return getToken().then((token) =>
          fetch(apiUrl, {
              method: "POST",
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(tag)
      }));
    };

    const deleteTag = (tagId) => {
      getToken().then((token) =>
      fetch(`${apiUrl}/${tagId}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }))
      
    }

    const getTagById = (tagId) => {
      //debugger
      return getToken().then((token) =>
          fetch(`${apiUrl}/${tagId}`, {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }))
          .then(resp => resp.json())    
    }

  // Provider method to edit a tag by sending a PUT request based on a Tag Object
  // to the Web API with a firebase Token for authentication.
  const editTag = (tag) => {
    debugger
    return getToken().then((token) => {
        debugger
        fetch(`${apiUrl}/${tag.Id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
    })});
  };

  
  return (
    <TagContext.Provider value={{tags, getAllTags, addTag, deleteTag, getTagById, editTag}}>
    {props.children}
    </TagContext.Provider>
  );
 
};