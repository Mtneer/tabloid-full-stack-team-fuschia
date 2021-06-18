import React from "react";
import {useHistory} from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

export const Tag = ({ tag }) => {
  const history = useHistory();
    // console.log(tag)
  return (
    <Card className="m-4">
      <CardBody>
        <strong>{tag.name}</strong>
        <div className="button-container"> 
        <Button className="button btn btn-sm" onClick={() => {history.push(`/tag/edit/${tag.id}`)}}>Edit</Button> 
        </div>
             
        
        <Button onClick={() => {history.push(`/tag/delete/${tag.id}`)}}>Delete</Button>
        
      </CardBody>
    </Card>
  );
}