import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={MainPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
