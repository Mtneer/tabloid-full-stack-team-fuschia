import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PostProvider } from "../providers/PostProvider";
import { PostList } from "./PostList";
import { PostForm } from "./PostForm";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import MyPosts from "./MyPosts";
import ConfirmDelete from "./ConfirmDelete";
import { PostDetails } from "./PostDetails";
import {TagList} from "../components/tag/TagList"
import { CategoryList } from "../components/Category/CategoryList"

export default function ApplicationViews() {
  // import the isLoggedIn state variable from the UserProfileContext
  const { isLoggedIn } = useContext(UserProfileContext);


  return (
    <main>
      {/* Use a Switch to provide and handle different routing options within the App */}
      <Switch>
        {/* Define the Home path as "/". Use the isLoggedIn state variable to 
        manage what the user sees based on their login status. If they are logged in,
        display a welcome message. If not, redirect them to the login page*/}
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>
        
        {/* Define the MyPosts path as "/myposts". Use the isLoggedIn state variable to 
        manage what the user sees based on their login status. If they are logged in,
        display their posts. If not, redirect them to the login page*/}
        <Route path="/myposts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>

        {/* Define the Login path as "/login". */}
        <Route path="/login">
          <Login />
        </Route>

        {/* Define the Register path as "/register". */}
        <Route path="/register">
          <Register />
        </Route>

        <Route exact path="/post">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/postform">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/postdetails/:postId(\d+)">
          {isLoggedIn ? <PostDetails/> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/post/delete/:postId">
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login" />}
        </Route>
        
        <Route exact path="/post/edit/:postId">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
};
