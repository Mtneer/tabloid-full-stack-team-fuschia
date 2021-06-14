import React from "react";
import { Card, CardBody,Button } from "reactstrap";
import {useHistory} from "react-router-dom";

export const Tag = ({ tag }) => {
  const history = useHistory();

  return (
    <Card className="m-4">
      <CardBody>
        <strong>{tag.name}</strong>
        
        <Button onClick={() => {history.push(`/tag/delete/${tag.id}`)}}>Delete</Button>
        
      </CardBody>
    </Card>
  );
}