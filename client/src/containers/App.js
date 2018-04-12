import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Homepage from "../components/Homepage";
import OreoPage from "./OreoPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/oreo/:id" component={OreoPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
