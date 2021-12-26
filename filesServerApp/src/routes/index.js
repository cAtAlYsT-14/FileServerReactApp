import React from "react";
import { Switch } from "react-router-dom";
import LandingPageContainer from "../components/LandingPage/landingPage";
import ServerDetailsContainer from "../components/ServerDetailsPage/serverDetails";
import Middleware from './middleware';

const HandleAppRouter = () => (
    <Switch>
        {routes.map((route, i) => <Middleware key={i} {...route} />)}
    </Switch>
);

export const routes = [
    {
        path: '/',
        component: LandingPageContainer,
        exact: true
    },
    {
        path: '/serverDetails/:id/',
        component: ServerDetailsContainer,
        exact: true
    },
]

export default HandleAppRouter;