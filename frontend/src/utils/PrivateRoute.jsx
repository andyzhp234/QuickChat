import React from "react";
import LoadingPage from "../pages/LoadingPage";
import { checkIsAuth } from "../lib/axios/authAPIs";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../store/actions/apiUserActions";

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch();

  const [authStatus, setAuthStatus] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    checkIsAuth()
      .then((res) => {
        setAuthStatus(true);
        setIsLoading(false);
      })
      .catch(async () => {
        await dispatch(userLogoutAction());
        setAuthStatus(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || authStatus == null) {
    return <LoadingPage />;
  }

  if (authStatus) {
    return children;
  } else {
    return <Navigate to={`/login`} />;
  }
};

export default PublicRoute;
