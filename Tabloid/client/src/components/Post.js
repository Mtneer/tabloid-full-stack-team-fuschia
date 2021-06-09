import React from "react";
import {useHistory} from "react-router-dom";
import { Card, CardImg, CardBody, CardHeader, Button } from "reactstrap";

export const Post = ({ post }) => {
  const isCurrentUserPost = JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId;
 
  const history = useHistory();
  // console.log(history)

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
           
          <div>
            {isCurrentUserPost 
              ? <Button onClick={() => {history.push(`/post/delete/${post.id}`)}}>Delete</Button> 
              : <div></div>
            }
          </div>
             
        </CardBody>
    </Card>
    
  );
};

export default Post;