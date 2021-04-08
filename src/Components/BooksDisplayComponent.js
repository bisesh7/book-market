import React, { useContext, useEffect, useState } from "react";
import { Container, CardColumns, CardDeck } from "reactstrap";
import { BooksContext } from "../Contexts/BooksContext";
import BooksCardComponent from "./BooksCardComponent";

const BooksDisplayComponent = (props) => {
  const { books } = useContext(BooksContext);

  const [bookCards, setBookCards] = useState(null);

  useEffect(() => {
    //   Generating cards of books in context
    const bookCards = books.map((book) => ({
      key: book.id,
      card: (
        <BooksCardComponent
          id={book.id}
          title={book["name "]}
          image={book.image}
          price={book.price}
          stock={book.stock}
          author={book.author}
          genre={book.genre}
          published_date={book.published_date}
        />
      ),
    }));
    setBookCards(bookCards);
  }, [books]);

  const [cardDecks, setCardDecks] = useState(null);

  useEffect(() => {
    //   Creating card deck so that the cards will be displayed in a grid
    if (bookCards) {
      // Card decks containg 4 cards
      let cardDecks = [];
      // List containing a card deck of 4 cards
      let fourCards = [];
      for (let i = 0; i <= bookCards.length; i++) {
        //   Push the card the four cards list
        fourCards.push(bookCards[i]);
        // if 4 cards is in the list we need to add it to card deck
        if (fourCards.length === 4) {
          // Creating a card deck of 4 cards
          const cardDeck = (
            <CardDeck key={i}>{fourCards.map((item) => item.card)}</CardDeck>
          );
          // Push the card deck to the list of carddecks
          cardDecks.push(cardDeck);
          //   empty the four cards list
          fourCards = [];
        }
      }
      setCardDecks(cardDecks);
    }
  }, [bookCards]);

  return (
    <Container>
      <div className="d-flex justify-content-end">
        <span>Filter</span>
      </div>
      <div className={props.className}>{cardDecks}</div>
    </Container>
  );
};

export default BooksDisplayComponent;
