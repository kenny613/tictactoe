//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar.components";
import Player from "./components/p5.components";
import AI from "./components/p5AI.components";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="container" class="ml-auto mr-auto mt-5">
          <Switch>
            <Route path="/" exact component={Player} />
            <Route path="/AI" exact component={AI} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
