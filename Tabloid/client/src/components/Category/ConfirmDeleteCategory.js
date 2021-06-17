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
            <button onClick={() => {history.push("/categories")}} className="buttonCancel">Cancel</button>
            <button onClick={() => {deleteCategory(categoryId); history.push("/categories")}} className="buttonDelete">
              Confirm
            </button>
          </div>
      </div>
    );
  }
  
  export default ConfirmDeleteCategory;