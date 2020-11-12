import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/user/context";
function PrivateRoute({ component: Component, ...rest }) {
  const context = useContext(UserContext);
return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("auth")  ? (
          <Redirect to="/" />
      
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
