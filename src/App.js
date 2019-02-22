import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MainPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
