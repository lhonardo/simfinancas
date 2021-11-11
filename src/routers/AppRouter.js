import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';

import PrivateRoute from './PrivateRouter';
import LoginPage from '../components/LoginPage';
import AboutPage from '../components/AboutPage';
import Ranking from '../components/Ranking';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <PrivateRoute path="/" component={HomePage} exact={true} />
                <PrivateRoute path="/home" component={HomePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/ranking" component={Ranking} />

                <Route path="/login" component={LoginPage} />

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
