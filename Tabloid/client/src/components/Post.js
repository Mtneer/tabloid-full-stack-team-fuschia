import React from "react";
import { Card, CardBody } from "reactstrap";

export const PostObject = ({ post }) => {
    
    return (
    
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile.fullName}</p>
      
      <CardBody>
        <p>
          <strong>{post.title}</strong>
        </p>
        <p>{post.category.name}</p>
        
      </CardBody>
    </Card>
    
  );
};