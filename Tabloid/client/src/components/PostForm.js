import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./Post.css";

export const PostForm = () => {
    const { addPost, getPostById, editPost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [postFormInput, setPostFormInput] = useState()
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {postId} = useParams();
    const history = useHistory();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCategories()
        .then(() => {
            if (postId) {
              getPostById(postId)
              .then(post => {
                setPostFormInput(post)
                setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
    }, []);

    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newPost = { ...postFormInput }
        //post is an object with properties , set the property to the new value using obejct bracket notation
        newPost[event.target.id] = event.target.value
        //update state
        setPostFormInput(newPost)
    }

    const handleClickSavePost = (event) => {
        // event.preventDefault() //prevents the browser from submitting the form

        // function extractId() {
        //     var str = loggedInUserId;
        //     var matches = str.match(/\d+/g);
        //     return matches[0];
        // }

        // const userName = extractId();

        setIsLoading(true);
        if (postId) {
            // PUT update
            editPost({
                Title: postFormInput.title,
                Content: postFormInput.content,
                PublishDateTime: postFormInput.publishDateTime,
                ImageLocation: postFormInput.imageLocation,
                CategoryId: parseInt(postFormInput.categoryId),
            })
            .then(() => history.push(`post/detail/${postId}`))
        } else {
            addPost({
                userProfileId: loggedInUserId,
                Title: postFormInput.title,
                Content: postFormInput.content,
                PublishDateTime: postFormInput.publishDateTime,
                ImageLocation: postFormInput.imageLocation,
                CategoryId: parseInt(postFormInput.categoryId),
                IsApproved: true
            })
            .then(() => history.push("/post"))
            //.then(() => history.push("/post/details/8787"))
        }
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="post title" value={postFormInput?.title} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="content" value={postFormInput?.content} />
                </div>
            </fieldset>
            <fieldset className="col-6">
                <label htmlFor="category">Category:</label>
                <select
                    value={postFormInput?.categoryId}
                    name="category"
                    id="categoryId"
                    onChange={handleControlledInputChange}
                    required
                    className="form-control" >
                    <option value="0">Select a category</option>
                    {categories.map(currentCategory => (
                        <option
                            key={currentCategory?.id}
                            value={currentCategory?.id}>
                            {currentCategory?.name}
                        </option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="text" id="imageLocation" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="image URL" value={postFormInput?.imageLocation} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publication date">Publication Date:</label>
                    <input type="datetime-local" id="publishDateTime" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="publication date" value={postFormInput?.publishDateTime} />
                </div>
            </fieldset>
            <div className="button-container">
                <button className="button btn btn-primary"
                    onClick={handleClickSavePost} disable={isLoading.toString()}>
                    {postId ? <>Save Post</> : <>Add Post</>}
                </button>
            </div>
        </form>
    )
}
