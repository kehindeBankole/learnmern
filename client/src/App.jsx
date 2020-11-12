import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import Toasts from "./components/Toast";
import UiState from "./context/ui/UiState";
import UserState from "./context/user/UserState";
import PostState from "./context/post/PostState";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import RegisterLogin from "./pages/RegisterLogin";
import { Button, Toast } from 'react-bootstrap';
import Create from "./pages/Create";
function App() {
  return (
  <PostState>
      <UiState>
      <UserState>
        <Router>
          <Nav />
          <Switch>
            <Route path="/register" component={RegisterLogin} exact />
            <Route path="/" component={Home} exact />
            <PrivateRoute path="/feed" component={Feed} exact />
            <PrivateRoute path="/createpost" component={Create} exact />
          </Switch>
        </Router>
      </UserState>
    </UiState>
   </PostState>
  );
}

export default App;
