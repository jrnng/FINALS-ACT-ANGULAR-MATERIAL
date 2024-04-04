//Nunag, Jaira | WD302
const express = require('express');
const app = express();

app.use(express.json());
 
const bookRoute = express.Router();
let Book = require('../model/Book');
 
// Add Book
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});
 
// Get all Books
bookRoute.route('/').get((req, res, next) => {
  Book.find()
      .then(data => {
          res.json(data);
      })
      .catch(error => {
          next(error); 
      });
});

// Get Book
bookRoute.route('/read-book/:id').get((req, res, next) => {
  Book.findById(req.params.id)
      .then(data => {
          if (!data) {
              return res.status(404).json({ message: 'Book not found' });
          }
          res.json(data);
      })
      .catch(error => {
          next(error);
      });
});

 
 
// Update Book
bookRoute.route('/update-book/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedBook => {
          if (!updatedBook) {
              return res.status(404).json({ message: 'Book not found' });
          }
          res.json(updatedBook);
          console.log('Book updated successfully!');
      })
      .catch(error => {
          next(error);
      });
});
 
// Delete Book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id })
      .then(deletedBook => {
          if (!deletedBook) {
              return res.status(404).json({ message: 'Book not found' });
          }
          res.status(200).json({ message: 'Book deleted successfully' });
      })
      .catch(error => {
          next(error);
      });
});
 
module.exports = bookRoute;

