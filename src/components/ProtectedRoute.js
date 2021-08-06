import React from "react";
import { Route, Redirect } from "react-router-dom";
import useCurrentUser from "./../customHooks/useCurrentUser";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { data, loading } = useCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        return loading ? (
          <></>
        ) : data && data.getCurrentUser ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
