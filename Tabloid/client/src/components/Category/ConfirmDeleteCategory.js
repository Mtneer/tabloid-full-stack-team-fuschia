import React, { useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import { CategoryContext } from '../../providers/CategoryProvider';

export const ConfirmDeleteCategory = () => {
    const { deleteCategory } = useContext(CategoryContext);
    const {categoryId} = useParams();
    const history = useHistory();
    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>Are you sure you want to delete this category?</h3>
          </div>
          <div className="row justify-content-center">
            <button onClick={() => {deleteCategory(categoryId); history.push("/categories")}} className="button btn btn-sm btn-primary">
              Confirm
            </button>
            <button onClick={() => {history.push("/categories")}} className="button btn btn-sm btn-secondary">Cancel</button>
          </div>
      </div>
    );
  }
  
  export default ConfirmDeleteCategory;