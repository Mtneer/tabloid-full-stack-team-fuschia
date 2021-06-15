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

  const addCategory = (category) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
    }).then(resp => {
      // debugger
      if (resp.ok) {
        return resp.json();
      }
      throw new Error("Unauthorized");
    }));
  };

  const deleteCategory = (categoryId) => {
    getToken().then((token) =>
        fetch(`${apiUrl}/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
    }));
  };
  
    
  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, deleteCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};