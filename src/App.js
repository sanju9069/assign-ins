import React from "react";
import FileUpload from "./components/FileUpload/Index";
import Header from "./components/Header/Header";
import Gallery from "./components/Gallery/Gallery";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={FileUpload} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
