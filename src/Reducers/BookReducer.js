export const BooksReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      console.log({ books: action.books });
      return { books: action.books };
    default:
      return state;
  }
};
