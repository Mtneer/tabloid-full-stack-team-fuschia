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
    const [ userInput, setUserInput ] = useState("");
    const [ activeOption, setActiveOption ] = useState(0);
      
    const history = useHistory();
    
    useEffect(() => {
      getPostById(postId)
      .then(setDetailPost)
      .then(getAllTags)
    }, [])

    const handleControlledInputChange = (e) => {
        const userInput = e.currentTarget.value;
        const newFilteredTags = tags.filter(
            (tag) => tag.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
        setFilteredTags(newFilteredTags);
        setUserInput(true);
        if (filteredTags) {
            setShowTagOptions(true);
        }
    };

    const onClick = (e) => {
        setActiveOption(0);
        setShowTagOptions(false);
        setUserInput(filteredTags[activeOption]);
    }

    // const onKeyDown = (e) => {
    //     // if "Enter" is pressed
    //     if (e.keyCode === 13) {
    //         setActiveOption(0);
    //         setShowTagOptions(false);
    //         setUserInput(filteredTags[activeOption]);
    //     }
    //     else if (e.keyCode === 38) {
    //         if (activeOption === 0) {
    //             return;
    //         }
    //         let newActiveOption = { ...activeOption };
    //         newActiveOption -= 1;
    //         setActiveOption(newActiveOption);
    //     } else if (e.keyCode === 40) {
    //         if (activeOption - 1 === filteredTags.length) {
    //             return;
    //         }
    //         let newActiveOption = { ...activeOption };
    //         newActiveOption += 1;
    //         setActiveOption(newActiveOption);
    //     }
    //   };

    const TagDropdown = () => {
        if (showTagOptions && userInput) {
            if (tags.length) {
              return (
                <ul className="tags">
                  {filteredTags.map((tag, index) => {
                    let className;
                    if (index === activeOption) {
                      className = 'option-active';
                    }
                    return (
                      <li className={className} key={tag.id}>
                        {tag.name}
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
                        <p className="col"><strong>{detailPost.title}</strong></p>
                        {/* <TagDropdown /> */}
                        <div className="col search">
                          <input type="text" className="search-box" onChange={handleControlledInputChange}/>
                          <input type="submit" value="" className="search-btn" />
                          <TagDropdown />
                        </div>
                    </div>
                    <div className="row">
                      {/* {Post.Tags.foreach }
                      <span class="badge badge-info">@tag.Name</span> */}
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



  
  