import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { Card, CardImg, CardBody, CardHeader, Button, Badge } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { TagContext } from "../providers/TagProvider";
import { PostTagContext } from "../providers/PostTagProvider";

export const PostDetails = () => {
  
    const { getPostById } = useContext(PostContext)
    const { postId } = useParams();
    const [ detailPost, setDetailPost ] = useState([]);

    // retrieve tags state variable from TagContext so that the dropdown list of tags which match the user input into the search bar can be filtered from this state variable list (tags)
    const { tags, getAllTags } = useContext(TagContext);
    // retrieve addPostTag method from PostTagContext to be used in creating new Post Tag relationships in the database
    const { addPostTag } = useContext(PostTagContext);

    /* State variable that keeps track of which tags in the database
    match the text in the Search bar */
    const [ filteredTags, setFilteredTags ] = useState([]);
    /* State variable that tells React whether to show or hide the 
    dropdown list of tags under the search bar */
    const [ showTagOptions, setShowTagOptions ] = useState(false);
    /* State variable that tracks the text in the search bar */
    const [ userInput, setUserInput ] = useState("");
    /* State variable that tracks the index of the selected tag for 
    the purpose of highlighting the user selected tag in the dropdown */
    const [ activeOption, setActiveOption ] = useState(0);
    
    useEffect(() => {
      getPostById(postId)
      .then(setDetailPost)
      .then(getAllTags)
    }, [])

    // Boolean to determine if the current post's userProfileId matches the logged in user's Id
    const isCurrentUserPost = JSON.parse(sessionStorage.getItem("userProfile")).id === detailPost.userProfileId;

    /* Helper function that monitors the User Input into the Search bar */
    const handleControlledInputChange = (e) => {
        // variable that copies user input
        const newUserInput = e.currentTarget.value;
        // filters tags based on the newUserInput into a list of objects {id, name}
        const newFilteredTags = tags.filter(
            (tag) => tag.name.toLowerCase().indexOf(newUserInput.toLowerCase()) > -1);
        // creates an array of tagNames from the newFilteredTags
        const newFilteredTagNames = newFilteredTags.map(tag => tag.name)
        // resets state for filteredTags (for the dropdown list)
        setFilteredTags(newFilteredTagNames);
        // resets state for userInput (which is the default display value for the search bar)
        setUserInput(newUserInput);
        // if there are filtered tags that match User Search, display them in the dropdown
        if (filteredTags) {
            setShowTagOptions(true);
        }
    };

    /* Helper function that monitors User Mouse selection of a dropdown
    list item */
    const onClickSelect = (e) => {
        // resets state for UserInput such that it matches the user selected Tag
        setUserInput(filteredTags[e.currentTarget.id]);
        // resets the ActiveOption to 0 (since we no longer need to display a dropdown)
        setActiveOption(0);
        // reset the dropdown visibility to false
        setShowTagOptions(false);
    }

    /* Helper function allows the user to use the up and down keys to select an item
    from the dropdown list and select that item using the Enter (Return) key */
    const onKeyDown = (e) => {

        // if the dropdown is not currently displayed and the user clicks something on the keyboard, ignore it
        if (showTagOptions===false) {
          return
        }

        // if "Enter" is pressed
        if (e.keyCode === 13) {
            // Do the same thing as the onClickSave function
            onClickSave(e)
        } 
        // if the Up Arrow is selected
        else if (e.keyCode === 38) {
            // if User is already at the top of the dropdown list, do nothing
            if (activeOption === 0) {
                return;
            }
            // reset state variable to activeOption (filteredTags list index) minus one
            setActiveOption(activeOption -1);
        } 
        // if the Down Arrow is selected
        else if (e.keyCode === 40) {
            // if User is already at the bottom of the dropdown list, do nothing 
            if (activeOption + 1 === filteredTags.length) {
                return;
            }
            // reset state variable to activeOption (filteredTags list index) plus one
            setActiveOption(activeOption+1);
        } 
        // if the Esc key is selected
        else if (e.keyCode === 27) {
          // hide the dropdown list
          setShowTagOptions(false);
          // reset the active option to 0
          setActiveOption(0);
        }
      };

    /* Helper function that monitors the submission of the Tag */
    const onClickSave = () => {
      // debugger
      // check to see if there is any user input
      if (userInput==="") {
        return alert("Please search for a tag.")
      }
      // check to see if the selected tag is already a relationship in the database
      const currentTagRelationships = detailPost.tags.map(tag => tag.name);
      if (currentTagRelationships.includes(userInput)) {
        return
      }
      // find the tag object from the list of Tags that matches the submitted userInput
      const tag = tags.find(tag => tag.name.toLowerCase()===userInput.toLowerCase())
      
      // call the addPostTag method, which comes from the PostTagProvider Context
      addPostTag({
        PostId: parseInt(postId),
        TagId: tag.id
      })
      .then(() => setUserInput(""))
      // Retrieve the new Post object from the database, which will have the new tag relationship
      .then(() => getPostById(postId))
      // set the new Post object to the state variable
      .then(setDetailPost)
    }

    // define the TagDropdown function which will render the dropdown list conditionally based on showTagOptions (boolean), userInput (string), and filteredTags (array)
    const TagDropdown = () => {
        if (showTagOptions && userInput) {
            if (filteredTags.length) {
              return (
                <ul className="tags">
                  {filteredTags.map((tag, index) => {
                    let className;
                    // if the index matches the activeOption, give it a special CSS class for the background highlight
                    if (index === activeOption) {
                      className = 'option-active';
                    }
                    return (
                      <li className={className} key={index} onClick={onClickSelect} id={index}>
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              );
            } else {
              return (
                <div className="no-options">
                  <em>No Option!</em>
                </div>
              );
            }
        } else {
          return null;
        }
    }
      
    return (
        <>
            <Card className="m-8">
                <CardHeader>
                    <div className="row">
                        <p className="col-lg-6 col-sm-6"><strong>{detailPost.title}</strong></p>
                        {
                          /* if the post being viewed was authored by the current logged in user, render the search bar allowing the user to add tags to their post */
                          (isCurrentUserPost) ? 
                            <div className="col-lg-5 col-sm-5">
                              <div className="row search">
                                <input type="text" className="search-box" value={userInput} onChange={handleControlledInputChange} onKeyDown={onKeyDown}/>
                                <Button type="submit" className="btn btn-primary btn-sm button search-btn" onClick={onClickSave}>+</Button>
                              </div>
                              <div className="row">
                                <TagDropdown />
                              </div>
                            </div>
                          : <div></div>
                        }
                    </div>
                    <div className="row badge-row">
                      {
                        // display the post's tags as pill badges
                        detailPost.tags?.map(tag => { 
                          return <Badge className="badge" color="info" key={tag.id}>{tag.name}</Badge>
                        })
                      }
                    </div>
                </CardHeader>
                <CardImg top src={detailPost.imageLocation} alt={detailPost.title} />
                <CardBody>
                    <p>{detailPost.content}</p>
                    <p>{detailPost.publishDateTime}</p>
                    <p>{detailPost.userProfile?.displayName}</p>
                    {/* ? prevents error, as on first load, this info will not yet be defined */}
                </CardBody>
            </Card>
        </>
    )
}



  
  