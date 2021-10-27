import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import Footer from "./Footer";

const DefaultRoute = ({
  component: Component,
  ...props
}) => {
  const { isShowSidebar } = useSelector((state) => state.commonReducer)

  return (
    <Route
      {...props}
      render={(routeProps) => (
        <>
          <UserHeader />
          <div className="wrapper">
            <UserSidebar />
            <div className={isShowSidebar ? "main active" : "main"}>
              <Component {...routeProps} />
            </div>
          </div>
          <Footer />
        </>
      )}
    />
  );
};

export default DefaultRoute;
