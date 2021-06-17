import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";

export const CategoryForm = () => {
  
  const history = useHistory();
  //exposing the addCategory function from the CategoryProdiver
  const { addCategory, getCategoryById, editCategory } = useContext(CategoryContext);
  // setting categroryText to an empty state so we can add in the new category information
  const [categoryInput, setCategoryInput] = useState();

  const handleControlledInputChange = (event) => {
      let newCategory = { ...categoryInput}
      newCategory[event.target.id] = event.target.value 
      setCategoryInput(newCategory)
  }

  const handleClickAddCategory = (event) => {
      event.preventDefault()
      addCategory({
          name: categoryInput.name
    })
    .then(() => history.push("/categories"))
  }
  
  return (
    <form className="categoryForm">
    <h2 className="categoryForm__title">Add Category</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="title">Category Name:</label>
            <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="" value={categoryInput?.name} />
        </div>
    </fieldset>
    
    <button className="btn btn-primary"
        onClick={handleClickAddCategory}>
        Save Category
        </button>
    </form>
  );
}
