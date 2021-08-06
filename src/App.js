import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { AddPost } from "./pages/AddPost";
import { UpdatePost } from "./pages/UpdatePost";
import useCurrentUser from "./customHooks/useCurrentUser";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { data: user, refetch } = useCurrentUser();
  return (
    <div style={{ width: "100%" }}>
      <Router>
        <NavBar user={user} refetch={refetch} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/not-found" exact component={NotFound} />
          <ProtectedRoute path="/add-post" exact component={AddPost} />
          <ProtectedRoute
            path="/update-post/:id"
            exact
            component={UpdatePost}
          />
          <ProtectedRoute path="/profile" exact component={ProfilePage} />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
