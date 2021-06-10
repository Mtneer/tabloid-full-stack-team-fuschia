import React from "react";
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardHeader } from "reactstrap";

export const Post = ({ post }) => {
    return (
    <Card className="m-8">
        <CardHeader>
        <Link to={`/postdetails/${post.id}`} style={{ textDecoration: 'none', color: 'black'}}><p><strong>{post.title}</strong></p></Link>
        </CardHeader>
        <CardImg top src={post.imageLocation} alt={post.title} />
        <CardBody>
          <p className="text-left px-2">Posted by: {post.userProfile.fullName}</p>
              <p>{post.caption}</p>
          <p>{post.category.name}</p>
              {/* <div className="comment-container">
              {post.comments.map(comment => (
                  <p key={comment.Id}>{comment.message}</p>
              ))}
              </div> */}
        </CardBody>
    </Card>
    
  );
};



export default Post;