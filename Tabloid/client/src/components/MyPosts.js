import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const MyPosts = () => {
    // import the posts state variable and getUserPosts function 
    // from the PostContext
    const { myposts, getUserPosts } = useContext(PostContext);

    // use the useEffect Hook to fetch data
    useEffect(() => {
        getUserPosts();
    }, []);


    // return a <div> containing a separate card for each Post in list of posts
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                    {myposts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPosts;