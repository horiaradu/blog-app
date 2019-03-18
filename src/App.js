import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './container/Posts';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import { Provider } from 'react-redux';
import store from './store';
import hoc from './components/auth/RouteProtection';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={hoc(Posts)} />
              <Route path="/login" component={SignIn} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
