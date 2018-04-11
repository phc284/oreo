import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from '../components/Homepage';
import OreoPage from './OreoPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/oreo/:id" component={OreoPage} />
      </Switch>
    );
  }
}

export default App;
