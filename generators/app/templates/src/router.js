import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import Bundle from './components/Bundle.js';
import Home from './routes/Home.js';
import Hello from 'bundle-loader?lazy&name=Hello!./routes/Hello.js';

export const dynamicWrapper = (app) => {
    return (props) => (
        <Bundle load={Hello}>
            {(Component) => <Component {...props} />}
        </Bundle>
    );
};
const hello = dynamicWrapper(Hello);

let router = ({ history }) => {
    return (
        <HashRouter history={history} basename="/">
            <div>
                <Switch>
                    <Route path="/index" exact component={Home} />
                    <Route path="/hello" component={hello} />
                    <Redirect from="/" to="/index" />
                </Switch>
            </div>
        </HashRouter>
    );
};

export default router;
