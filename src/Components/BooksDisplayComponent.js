import React, { useContext, useEffect, useRef, useState } from "react";
import { CardDeck, Button, Input } from "reactstrap";
import { BooksContext } from "../Contexts/BooksContext";
import { getGenres } from "../Functions/getGenres";
import BooksCardComponent from "./BooksCardComponent";

const BooksDisplayComponent = (props) => {
  // Getting the books from context
  const { books } = useContext(BooksContext);
  const [booksAccordingToGenre, setBooksAccordingToGenre] = useState(books);
  const [genres, setGenres] = useState([]);
  const [genreOptions, setGenreOptions] = useState(null);
  const [genreSelected, setGenreSelected] = useState("all-genres");

  // Set the genres
  useEffect(() => {
    setGenres(getGenres(books));
  }, [books]);

  // Generating the genres options for selecting genre
  useEffect(() => {
    // Generating options from the genres list
    const genreOptions = genres.map((genre, index) => {
      if (genre === "(no genres listed)")
        return <option key={index}>Others</option>;
      else return <option key={index}>{genre}</option>;
    });
    // Adding option of All Genres to the select
    genreOptions.unshift(
      <option key={genres.length} value="all-genres" selected>
        All Genres
      </option>
    );
    setGenreOptions(genreOptions);
  }, [genres]);

  // Filter the book results whenever the user selects a genre
  useEffect(() => {
    let booksAccordingToGenre = [];
    // If there a particular genre is selected
    if (genreSelected !== "all-genres" && genreSelected !== "Others") {
      booksAccordingToGenre = books.filter((book) =>
        // Since book can have different genres
        book.genre.includes(genreSelected)
      );
    } else if (genreSelected === "Others") {
      booksAccordingToGenre = books.filter(
        (book) => book.genre === "(no genres listed)"
      );
    } else {
      booksAccordingToGenre = books;
    }

    setBooksAccordingToGenre(booksAccordingToGenre);
  }, [genreSelected, books]);

  //   All the book cards
  const [bookCards, setBookCards] = useState(null);

  //   Generating cards of books in genre
  useEffect(() => {
    const bookCards = booksAccordingToGenre.map((book) => ({
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
          key={book.id}
          setAlertVisible={props.setAlertVisible}
          setAlertMessage={props.setAlertMessage}
        />
      ),
    }));
    setBookCards(bookCards);
  }, [booksAccordingToGenre]);

  const [cardDecks, setCardDecks] = useState([]);

  //   Creating card deck so that the cards will be displayed in a grid
  useEffect(() => {
    if (bookCards) {
      // Card decks containg cards
      let cardDecks = [];
      // List containing a cards in a deck
      let cardsInADeck = [];

      for (let i = 0; i < bookCards.length; i++) {
        //   Push the card into four cardsInADeck
        cardsInADeck.push(bookCards[i]);

        // A deck will contain at most 4 cards but final deck can contain less than 4 cards
        // So we check if the deck is final or not
        if (
          (i === bookCards.length - 1 && cardsInADeck.length < 4) ||
          cardsInADeck.length === 4
        ) {
          // Creating a card deck
          const cardDeck = (
            <CardDeck key={i} className="mb-4">
              {cardsInADeck.map((item) => item.card)}
            </CardDeck>
          );
          // Push the card deck to the list of carddecks
          cardDecks.push(cardDeck);
          //   empty the cardInADeck list
          cardsInADeck = [];
        }
      }
      setCardDecks(cardDecks);
    }
  }, [bookCards]);

  //   Number of card deck initially shown
  const [numberOfCardDecks, setNumberOfCardDecks] = useState(3);
  const [cardDecksShown, setCardDecksShown] = useState([]);

  useEffect(() => {
    if (cardDecks) {
      setCardDecksShown(cardDecks.slice(0, numberOfCardDecks));
    }
  }, [cardDecks, numberOfCardDecks]);

  //   Reference to the end of the page
  let pageEnd = useRef(null);

  //   Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    pageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  //   Whenever show more is clicked we add another deck of cards
  const showMoreHandler = (e) => {
    e.preventDefault();
    if (numberOfCardDecks !== cardDecks.length) {
      setNumberOfCardDecks(numberOfCardDecks + 1);
    }
  };

  //   Whenever new deck of card is added we slide to the bottom of the page
  useEffect(() => {
    // We only slide to the bottom when we add a deck to the current decks
    // When we add to the current decks them currrent decks will be more than 3
    if (cardDecksShown.length > 3) scrollToBottom();
  }, [cardDecksShown]);

  return (
    <div className={props.className}>
      <div>
        <span>Select Genre: </span>
        <Input
          onChange={(e) => {
            setGenreSelected(e.target.value);
          }}
          type="select"
          className="genre-select"
        >
          {genreOptions}
        </Input>
      </div>

      <div className={props.className}>{cardDecksShown}</div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          outline
          color="primary"
          onClick={showMoreHandler}
          disabled={cardDecks.length === cardDecksShown.length}
        >
          {cardDecks.length === cardDecksShown.length
            ? "No More Books"
            : "Load More"}
        </Button>
        {/* Div for bottom of the page reference */}
        <div style={{ float: "left", clear: "both" }} ref={pageEnd}></div>
      </div>
    </div>
  );
};

export default BooksDisplayComponent;
