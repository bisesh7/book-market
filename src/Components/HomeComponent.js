import React from "react";
import BooksDisplayComponent from "./BooksDisplayComponent";
import NavbarComponent from "./NavbarComponent";

const HomeComponent = (props) => {
  return (
    <div>
      <NavbarComponent />
      <BooksDisplayComponent {...props} className="mt-3 mb-4" />
    </div>
  );
};

export default HomeComponent;
