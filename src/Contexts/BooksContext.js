import React, { createContext, useReducer } from "react";
import { BooksReducer } from "../Reducers/BookReducer";

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
  const [auth, dispatch] = useReducer(BooksReducer, {
    isAuthenticated: false,
    user: {},
  });

  return (
    <BooksContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
