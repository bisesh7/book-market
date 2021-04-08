import React, { createContext, useReducer } from "react";
import { BooksReducer } from "../Reducers/BookReducer";
import booksJSON from "../Books/book_set.json";

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
  const [books, dispatch] = useReducer(BooksReducer, booksJSON);

  return (
    <BooksContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
