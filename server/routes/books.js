/** 
  books.js
  Student Name: Chinnawut Boonluea
  Student ID: 301276464
  Date: 2023-03-03
**/
// modules required for routing
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// define the book model
const book = require('../models/books');
const bookController = require('../controllers/books');

/* GET books List page. READ */
router.get('/', bookController.displayBookList);

//  GET the Book Details page in order to add a new Book
router.get('/add', bookController.displayAddPage);

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', bookController.processAddPage);

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', bookController.displayEditPage);

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', bookController.processEditPage);

// GET - process the delete by user id
router.get('/delete/:id', bookController.performDelete);

module.exports = router;
