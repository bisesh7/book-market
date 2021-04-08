import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/HomeComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomeComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
