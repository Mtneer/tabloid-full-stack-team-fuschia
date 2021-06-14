import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

export const TagForm = () => {
  const history = useHistory();
  //exposing the addTag function from the TagProdiver
  const { addTag } = useContext(TagContext);
  // setting tagInput to an empty state so we can add in the new tag information
  const [tagInput, setTagInput] = useState({});

  //update state when a field changes; the return will re-render and display based on the values in state
  const handleControlledInputChange = (event) => {
    //creating a copy of state to change and then set;using spread syntax to copy an object 
    let newTag = { ...tagInput}
    //tag is an object with properties;set the properties to the new valuse using object bracket notation 
    newTag[event.target.id] = event.target.value 
    //update state 
    setTagInput(newTag)
  }

  const handleClickAddTag = (event) => {
    //prevents the browser from submitting the form  
    event.preventDefault()
    //uses the addTag function from the provider page  
    addTag({
          name: tagInput.name
    })
    .then(() => history.push("/tags"))
  }
  
  return (
    <form className="tagForm">
    <h2 className="tagForm__title">Add Tag</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="title">Tag Name:</label>
            <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="" value={tagInput?.name} />
        </div>
    </fieldset>
    
    <button className="btn btn-primary"
        onClick={handleClickAddTag}>
        Save Tag
        </button>
    </form>
  );
}
