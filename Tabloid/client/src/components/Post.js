import React from "react";
import { Card, CardImg, CardBody, CardHeader } from "reactstrap";

const Post = ({ post }) => {
  return (
    <Card className="m-8">
        <CardHeader>
            <p><strong>{post.title}</strong></p>
        </CardHeader>
        <CardImg top src={post.imageUrl} alt={post.title} />
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