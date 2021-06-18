
import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Button from "reactstrap/lib/Button";





export const Category = ({ category }) => {
  

  const history = useHistory();
    
  return (
    <Card className="m-4">
      <CardBody>
        <strong>{category.name}</strong>
      </CardBody>
      {/* // if categoryId doesnt exist in post, draw delete button */}
      {category.isUsed?
      " "
      :
      <Button onClick={() => {history.push(`/categories/delete/${category.id}`)}}>Delete</Button> 
      }
      <Button onClick={() => {history.push(`/categories/edit/${category.id}`)}}>Edit</Button>
    </Card>
  );
}
//modify api 
//boolean on category model