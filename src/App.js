import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './container/Posts';
import Navbar from './components/layout/Navbar';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Posts} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
