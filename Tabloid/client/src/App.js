import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from './providers/CategoryProvider';

// Define an App function which initializes the Header and ApplicationViews components nested within the UserProfileProvider and Router, such that the login authorization can interact with the UserProfiles in the database and ApplicationViews can define Routes.
function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <CategoryProvider>
            <Header />
            <ApplicationViews />
          </CategoryProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
