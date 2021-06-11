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
      <div className="row justify-content-center">
        <div className="cards-column">
            {// sorting tags alphabetically
            tags.sort((a, b) => a.name.localeCompare(b.name))
            //map through all tags in database 
            .map((tag) => (
            <Tag key={tag.id} tag={tag} />
            ))}
        </div>
      </div>
    </div>

  );
}