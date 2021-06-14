import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

export const TagForm = () => {
  const history = useHistory();
  //exposing the addTag function from the TagProdiver
  const { addTag } = useContext(TagContext);
  // setting tagText to an empty state so we can add in the new tag information
  const [tagInput, setTagInput] = useState();

  const handleControlledInputChange = (event) => {
      let newTag = { ...tagInput}
      newTag[event.target.id] = event.target.value 
      setTagInput(newTag)
  }

  const handleClickAddTag = (event) => {
      event.preventDefault()
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
