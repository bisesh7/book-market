import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/HomeComponent";
import BooksContextProvider from "./Contexts/BooksContext";

function App() {
  return (
    <BooksContextProvider>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomeComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </BooksContextProvider>
  );
}

export default App;
