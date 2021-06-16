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
  
  return (
    <TagContext.Provider value={{tags, getAllTags, addTag}}>
      {props.children}
    </TagContext.Provider>
  );
 
};