/** 
  books.js
  Student Name: Chinnawut Boonluea
  Student ID: 301276464
  Date: 2023-03-03
**/
const Book = require("../models/books");

// Display the list of books
module.exports.displayBookList = (req, res, next) => {
  // Find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
};

// Display the add book page
module.exports.displayAddPage = (req, res, next) => {
  // Render the add page with the books object
  res.render("books/details", {
    title: "Add Book",
    books: { Title: "", Description: "", Price: 0, Author: "", Genre: "" },
  });
};

// Process the add book form
module.exports.processAddPage = (req, res, next) => {
  // Create a new book add to database
  const { title, description, price, author, genre } = req.body;
  const newBook = new Book({
    Title: title,
    Description: description,
    Price: price,
    Author: author,
    Genre: genre,
  });

  Book.create(newBook, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect("/books");
  });
};

// Display the edit book page
module.exports.displayEditPage = (req, res, next) => {
  // Render the edit page with the book with the id
  const id = req.params.id;

  Book.findById(id, (err, books) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.render("books/details", {
      title: "Edit Book",
      books: books,
    });
  });
};

// Process the edit book form
module.exports.processEditPage = (req, res, next) => {
  // Edit a book in the database with the id
  const id = req.params.id;
  const { title, description, price, author, genre } = req.body;
  const updatedBook = new Book({
    _id: id,
    Title: title,
    Description: description,
    Price: price,
    Author: author,
    Genre: genre,
  });

  Book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect("/books");
  });
};

// Delete a book
module.exports.performDelete = (req, res, next) => {
  const bookId = req.params.id; // get the book ID from the request parameters
  console.log("bookId ", bookId);
  Book.remove({ _id: bookId }, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect("/books");
  });
};

module.exports.getBookById = (req, res, next) => {
  const bookId = req.params.id; // get the book ID from the request parameters

  Book.findById(bookId, (err, book) => {
    // find the book by ID using the Book model
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while finding the book");
    } else if (!book) {
      res.status(404).send("Book not found");
    } else {
      // render the view with the book data
      res.render("books/", {
        title: "Book Detail",
        books: book,
      });
    }
  });
};
