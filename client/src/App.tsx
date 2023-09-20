import { Routes, Route } from "@solidjs/router";

import About from "./pages/About";
import API from "./pages/API";
import Home from "./pages/Home";
import Paper from "./pages/Paper";
import Search from "./pages/Search";
import Tissues from "./pages/Tissues";

import Results from "./data/sample/search";

const App = () => (
  <Routes>
    <Route
      path="/search/:term"
      component={() => <Search results={Results.data} />}
    />
    <Route path="/tissues" component={Tissues} />
    <Route path="/docs" component={API} />
    <Route path="/paper" component={Paper} />
    <Route path="/about" component={About} />
    <Route path="/" component={Home} />
  </Routes>
);

export default App;
