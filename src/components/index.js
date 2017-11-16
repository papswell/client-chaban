import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Homepage from './homepage';
import Singlepage from './singlepage';

import ErrorBoundary from './error/boundary';

class App extends Component {

  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <Router>
            <Switch>
              <Route path="/:id" component={Singlepage} />
              <Route component={Homepage} />
            </Switch>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }

}

export default App;
