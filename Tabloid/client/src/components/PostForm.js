import React, { useContext } from "react"
import { PostContext } from "../providers/PostProvider";
import { useHistory } from 'react-router-dom';

export const PostForm = () => {
    const { addPost } = useContext(PostContext);

    const history = useHistory()

    //when a field changaes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        const newPost = { ...post }
        //post is an object with properties , set the property to the new value using obejct bracket notation
        newPost[event.target.id] = event.target.value
        //update state
        setPost(newPost)
    }

    const handleClickSavePost = (event) => {
        event.preventDefault() //prevents the browser from submitting the form
        addPost({
           
            Title: post.Title,
            Caption: post.Caption,
            DateCreated: parseInt(post.DateCreated),
            ImageUrl: post.ImageUrl,
            UserProfileId: parseInt(post.UserProfileId)
            
        })
        //.then(() => history.push("/post/details"))
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="post title" value={post.title}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" id="caption" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="post caption" value={post.caption}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" id="imageURL" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="image URL" value={post.ImageUrl}/>
                </div>
            </fieldset>
            
            <button className="btn btn-primary"
              onClick={handleClickSavePost}>
              Save Post
            </button>
        </form>
      )

}
