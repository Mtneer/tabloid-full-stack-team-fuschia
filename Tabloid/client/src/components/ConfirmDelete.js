import React, { useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import { PostContext } from '../providers/PostProvider';

export const ConfirmDelete = () => {
    const { deletePost } = useContext(PostContext);
    const {postId} = useParams();
    const history = useHistory();
    return (
        <div className="container">
        <div className="row justify-content-center">
          <p>Are you sure you want to delete?</p>
          <button onClick={() => {history.push("/post")}} className="modal_buttonCancel">Cancel</button>
          <button onClick={() => {deletePost(postId); history.push("/post")}} className="modal_buttoDelete">
            Confirm
          </button>
        </div>
      </div>
    );
  }
  
  export default ConfirmDelete;