import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = sessionStorage.getItem("authentication") !== null;

    return (
        <Route
        {...restOfProps}
        render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        }
        />
    );
}

export default ProtectedRoute;