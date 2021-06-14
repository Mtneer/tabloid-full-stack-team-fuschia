import React from "react";
import { Card, CardBody } from "reactstrap";

export const Category = ({ category }) => {
    console.log(1)
  return (
    <Card className="m-4">
      <CardBody>
        <strong>{category.name}</strong>
      </CardBody>
    </Card>
  );
}