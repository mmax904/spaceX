import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from './Loader';

const LoadableLaunchList = Loadable({
  loader: () => import(/* webpackChunkName: 'LaunchList' */ './LaunchList'),
  loading: () => <Loader loading={true} />
});

const App = () => (
  <Switch>
    <Route exact path="/" component={LoadableLaunchList} />
    <Redirect from="*" to={"/"} />
  </Switch>
);

export default App;
