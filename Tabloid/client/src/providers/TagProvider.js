import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/Tag";
  const { getToken } = useContext(UserProfileContext);

  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    getToken().then((token) =>
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

  return (
    <TagContext.Provider value={{tags,getAllTags}}>
      {props.children}
    </TagContext.Provider>
  );
 
};