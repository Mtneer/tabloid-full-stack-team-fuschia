import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "/api/Category";
  const { getToken } = useContext(UserProfileContext);
  
  const [ categories, setCategories ] = useState([]);
  
  const getAllCategories = () => {
    getToken().then((token) =>
        fetch(`${apiUrl}/GetAll`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setCategories);
  };
  
    
  return (
    <CategoryContext.Provider value={{ categories, getAllCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};