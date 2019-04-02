import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './container/Posts';
import BlogForm from './components/BlogForm';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { EnsureUserIsLoggedIn, EnsureNoUser } from './components/auth/RouteProtection';
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
              <Route exact path="/createEntry" component={EnsureUserIsLoggedIn(BlogForm)} />
              <Route path="/login" component={EnsureNoUser(SignIn)} />
              <Route path="/signup" component={EnsureNoUser(SignUp)} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
