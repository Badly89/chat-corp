import { Route, Redirect } from "react-router-dom";

export default function PublicRoute({
    component: Component,
    isAuthenticated,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated === false ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}
