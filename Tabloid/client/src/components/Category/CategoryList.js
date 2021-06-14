import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Category } from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import Button from "reactstrap/lib/Button";

export const CategoryList=() => {
  const history = useHistory();
  const { categories, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
            {// sorting categories alphabetically
            categories.sort((a, b) => a.name.localeCompare(b.name))
            //map through all categories in database 
            .map((category) => (
            <Category key={category.id} category={category} />
            ))}
        </div>
      </div>
    </div>

  );
}