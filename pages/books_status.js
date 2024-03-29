let BookInstance = require('../models/bookinstance');

exports.show_all_books_status = async function(res) {
  try {
    let availableBooks = await BookInstance.find({ status: 'Available' }).populate('book');
    let booksData = availableBooks.map(bookInstance => {
      return {
        title: bookInstance.book.title,
        status: bookInstance.status
      };
    });
    return res.json(booksData);
  } catch (err) {
    console.log('Error retrieving available books: ', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}