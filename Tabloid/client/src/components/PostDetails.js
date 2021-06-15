import React, { useContext, useEffect, useState } from "react";
import {useParams, useHistory} from "react-router-dom"
import { Card, CardImg, CardBody, CardHeader, Button } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { TagContext } from "../providers/TagProvider";

export const PostDetails = () => {
    const { getPostById } = useContext(PostContext)
    const { postId } = useParams();
    const [ detailPost, setDetailPost ] = useState([]);

    // retrieve tags state variable from TagContext
    const { tags, getAllTags } = useContext(TagContext);
    const [ filteredTags, setFilteredTags ] = useState([]);
    const [ showTagOptions, setShowTagOptions ] = useState(false);
    const [ userInput, setUserInput ] = useState(false);
    const [ activeOption, setActiveOption ] = useState(0);
      
    const history = useHistory();
    
    useEffect(() => {
      getPostById(postId)
      .then(setDetailPost)
      .then(getAllTags);
    }, [])

    const handleControlledInputChange = (e) => {
        const userInput = e.currentTarget.value;
        const newFilteredTags = tags.filter(
            (tag) => tag.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
        setFilteredTags(newFilteredTags);
        setUserInput(true);
        if (filteredTags) {
            setShowTagOptions(true);
        }
    };

    const onClick (e) => {
        setActiveOption(0);
        setShowTagOptions(false);
        setUserInput(filteredTags[activeOption]);
    }

    onKeyDown = (e) => {
        // if "Enter" is pressed
        if (e.keyCode === 13) {
            setActiveOption(0);
            setShowTagOptions(false);
            setUserInput(filteredTags[activeOption]);
        }
        else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            let newActiveOption = { ...activeOption };
            newActiveOption -= 1;
            setActiveOption(newActiveOption);
        } else if (e.keyCode === 40) {
            if (activeOption - 1 === filteredTags.length) {
                return;
            }
            let newActiveOption = { ...activeOption };
            newActiveOption += 1;
            setActiveOption(newActiveOption);
        }
      };

    const TagDropdown = () => {
        if (showTagOptions && userInput) {
            if (filteredTags.length) {
              return (
                <ul className="tags">
                  {filteredTags.map((tagName, index) => {
                    let className;
                    if (index === activeOption) {
                      className = 'option-active';
                    }
                    return (
                      <li className={className} key={optionName} onClick={onClick}>
                        {optionName}
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
          }
    }
      
    return (
        <>
            <Card className="m-8">
                <CardHeader>
                    <p><strong>{detailPost.title}</strong></p>
                    <div className="row button-container">
                        <TagDropdown />
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



  
  