import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/HomeComponent";
import BooksContextProvider from "./Contexts/BooksContext";
import CartContextProvider from "./Contexts/CartContext";

function App() {
  return (
    <BooksContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={HomeComponent} />
            </Switch>
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </BooksContextProvider>
  );
}

export default App;
