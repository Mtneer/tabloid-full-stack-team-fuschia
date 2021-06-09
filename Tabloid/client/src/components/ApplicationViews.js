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
          <PostProvider >
            {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
          </PostProvider>
        </Route>

        {/* Define the Login path as "/login". */}
        <Route path="/login">
          <Login />
        </Route>

        {/* Define the Register path as "/register". */}
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/post">
          <PostList />
        </Route>

        <Route path="/postform">
          <PostForm />
        </Route>
      </Switch>
    </main>
  );
};
