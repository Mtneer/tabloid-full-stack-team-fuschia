import React from "react";
import { Card, CardBody } from "reactstrap";

export const Tag = ({ tag }) => {
    // console.log(tag)
  return (
    <Card className="m-4">
      <CardBody>
        <strong>{tag.name}</strong>
      </CardBody>
    </Card>
  );
}