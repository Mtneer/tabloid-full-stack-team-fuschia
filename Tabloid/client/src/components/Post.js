import { Card, CardImg, CardBody } from "reactstrap";

export const Post = ({ post }) => {
    return (
    
    <Card className="m-4">
      
      <CardBody>
        <p>
          <strong>{post.title}</strong>
        </p>
        <p>{post.author}</p>
        <p>{post.category}</p>
        
      </CardBody>
    </Card>
    
  );
};
