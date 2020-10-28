import React, { Component } from "react";
import { render } from "react-dom";
import  { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Estampar from "./Estampar";
import Verificar from "./Verificar";

class App extends Component {

  constructor(props) {
    super(props);
    }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/api:id" component={ Estampar } />
          <Route path="/api/verificar" component={ Verificar } />
        </Switch>
      </Router>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
