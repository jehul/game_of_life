import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import GridView from "../src/views/GridView";
import Home from "../src/views/Home";
import Header from "../src/components/Header";
import colors from "./styles/colors";

const App = () => {
  return (
    <div className="App" style={{ backgroundColor: colors.yellow }}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game">
            <GridView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
