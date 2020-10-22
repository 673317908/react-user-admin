import React from "react";
import { Route,Redirect } from "react-router-dom";
import { getInfo } from "@/utils/storage"
const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps => (
                getInfo("user_token")?<Component {...routeProps} />:<Redirect to="/"></Redirect> 
            )}
        />
    );
}

export default PrivateRouter