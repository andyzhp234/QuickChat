import React from "react";
import { Navigate } from "react-router-dom";
import { checkIsAuth } from "../lib/axios/authAPIs";
import LoadingPage from "../pages/LoadingPage";

const PublicRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    console.log("checking public auth");
    checkIsAuth()
      .then((req) => {
        console.log("checking public auth ends");
        setAuthStatus(true);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("checking public auth ends & errors");
        setAuthStatus(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || authStatus == null) {
    return <LoadingPage />;
  }

  if (authStatus) {
    return <Navigate to={`/dashboard`} />;
  } else {
    return children;
  }
};

export default PublicRoute;
