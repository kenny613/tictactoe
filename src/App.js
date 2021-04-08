//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar.components";
import P5 from "./components/p5.components";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="container" class="ml-auto mr-auto mt-5">
          <P5 />
        </div>
      </div>
    </Router>
  );
}

export default App;
