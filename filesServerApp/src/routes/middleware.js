import React from "react";
import { Route } from "react-router-dom";

const Middleware = (route) => {

  const renderComponent = (props) => {
    if (route.private) return <route.component {...props} routes={route.routes} />;
    else return <route.component {...props} routes={route.routes} />;
  };

  return <Route path={route.path} exact={route.exact} render={renderComponent} />
};

export default Middleware;