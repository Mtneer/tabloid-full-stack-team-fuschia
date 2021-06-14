import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tag } from "./Tag";
import { TagContext } from "../../providers/TagProvider";
import Button from "reactstrap/lib/Button";

export const TagList=() => {
  const history = useHistory();
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);


  return (
    <div className="container">
      
      <div><Button onClick={() => history.push("/tags/tagForm")}>Create Tag</Button></div>

        <div className="cards-column">
            {// sorting tags alphabetically
            tags.sort((a, b) => a.name.localeCompare(b.name))
            //map through all tags in database 
            .map((tag) => (
            <Tag key={tag.id} tag={tag} />
            ))}
        </div>
        
        
      </div>
  
    //the button has anonymous onClick function to go to the /tagForm route -- where the tag form will pull up
  );
}