import React, { useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

export const ConfirmTagDelete = () => {
    const { deleteTag } = useContext(TagContext);
    const {tagId} = useParams();
    const history = useHistory();
    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>Are you sure you want to delete this tag?</h3>
          </div>
          <div className="row justify-content-center">
            <button onClick={() => {deleteTag(tagId); history.push("/tags")}} className="button btn btn-sm btn-primary">
              Confirm
            </button>
            <button onClick={() => {history.push("/tags")}} className="button btn btn-sm btn-secondary">Cancel</button>
          </div>
      </div>
    );
  }
  
  export default ConfirmTagDelete;