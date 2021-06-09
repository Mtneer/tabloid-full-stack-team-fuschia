import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { useHistory } from 'react-router-dom';
import Post from "./Post";

export const PostForm = () => {
    const { addPost, post } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [ postFormInput, setPostFormInput] = useState()
    const history = useHistory()

    useEffect(() => {
        getAllCategories();
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
        event.preventDefault() //prevents the browser from submitting the form
        addPost({
            Author: +sessionStorage.getItem("userProfile"),
            Title: postFormInput.title,
            Content: postFormInput.content,
            PublishDateTime: parseInt(postFormInput.publishDateTime),
            ImageLocation: postFormInput.imageLocation,
            Category: parseInt(postFormInput.CategoryId),
            CreateDateTime: +Date.now()
            
        })
        //.then(() => history.push("/post/details"))
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="post title" value={postFormInput?.title}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="content" value={postFormInput?.content}/>
                </div>
            </fieldset>
            <fieldset className="col-6">
                    <label htmlFor="category">Category:</label>
                    <select 
                      value={postFormInput?.categoryId} 
                      name="category" 
                      id="categoryId" 
                      onChange= {handleControlledInputChange} 
                      required
                      className="form-control" >
                    <option value="0">Select a category</option>
                      {categories.map(currentCategory => (
                        <option 
                        key={currentCategory.id} 
                        value={currentCategory.id}>
                          {currentCategory.name}
                        </option>
                      ))}
                    </select>   
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="text" id="imageURL" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="image URL" value={postFormInput?.imageLocation}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publication date">Publication Date:</label>
                    <input type="DateTime" id="publication date" onChange={handleControlledInputChange}  autoFocus className="form-control" placeholder="publication date" value={postFormInput?.publishDateTime}/>
                </div>
            </fieldset>
            
            <button className="btn btn-primary"
              onClick={handleClickSavePost}>
              Save Post
            </button>
        </form>
      )

}
