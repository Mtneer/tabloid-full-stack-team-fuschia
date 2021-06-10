import React, { useContext, useEffect, useState } from "react";
import {useParams, useHistory} from "react-router-dom"
import { Card, CardImg, CardBody, CardHeader } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { Post } from "./Post";

export const PostDetails = () => {
    const { getPostById } = useContext(PostContext)
    const {postId} = useParams();

    const [detailPost, setDetailPost] = useState([]);
      
  
    useEffect(() => {
      console.log("useEffect", postId)
      getPostById(postId)
      .then(resp => resp.json())
      .then(setDetailPost);
      
      }, [])
      
    return (
        <>
            <Card className="m-8">
                <CardHeader>
                    <p><strong>{detailPost.title}</strong></p>
                </CardHeader>
                <CardImg top src={detailPost.imageLocation} alt={detailPost.title} />
                <CardBody>
                    <p>{detailPost.content}</p>
                    <p>{detailPost.publishDateTime}</p>
                    <p>{detailPost.userProfile?.displayName}</p>
                    
                </CardBody>
            </Card>
        </>
    )
  }

  
  