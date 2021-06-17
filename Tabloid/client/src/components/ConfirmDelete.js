import React, { useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import { PostContext } from '../providers/PostProvider';
import "./Post.css";

export const ConfirmDelete = () => {
    const { deletePost, getAllPosts } = useContext(PostContext);
    const {postId} = useParams();
    const history = useHistory();

    const onClickDelete = () => {
      deletePost(postId)
      .then(getAllPosts)
      .then(history.push("/post"))
    }
    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>Are you sure you want to delete this post?</h3>
          </div>
          <div className="row justify-content-center button-container">
            <button className="button btn btn-sm btn-primary" onClick={onClickDelete}>
              Confirm
            </button>
            <button className="button btn btn-sm btn-secondary" onClick={() => {history.push("/post")}}>Cancel</button>
          </div>
      </div>
    );
  }
  
  export default ConfirmDelete;