const Book = require("../models/Book");
const { validationResult } = require("express-validator");
const Borrow = require("../models/Borrow");

// Add Book
exports.addBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.errors = errors.array();
      throw error;
    }

    const { title, author, isbn, category, quantity } = req.body;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      const error = new Error("Book with this ISBN already exists");
      error.statusCode = 400;
      throw error;
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      quantity,
      availableQuantity: quantity,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
// Get All Books
exports.getAllBooks = async (req, res, next) => {
  try {
    // Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // Search & Filter
    const filter = {};

    if (req.query.search) {
      filter.$or = [
        {
          title: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Allowed sorting fields
    const allowedSortFields = [
      "title",
      "author",
      "category",
      "quantity",
      "availableQuantity",
      "createdAt",
    ];

    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "createdAt";

    const order = req.query.order === "asc" ? 1 : -1;
    const totalBooks = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPageCount: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};
// Get Book By ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Update Book
exports.updateBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.errors = errors.array();
      throw error;
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    const oldQuantity = book.quantity;
    const oldAvailable = book.availableQuantity;

    Object.assign(book, req.body);

    // Keep availableQuantity consistent when quantity changes
    if (req.body.quantity !== undefined) {
      const borrowedCount = oldQuantity - oldAvailable;
      book.availableQuantity = Math.max(
        req.body.quantity - borrowedCount,
        0
      );
    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
// Borrow Book

exports.borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    if (book.availableQuantity <= 0) {
      const error = new Error("Book is currently unavailable");
      error.statusCode = 400;
      throw error;
    }

    const alreadyBorrowed = await Borrow.findOne({
      member: req.user._id,
      book: book._id,
      status: "borrowed",
    });

    if (alreadyBorrowed) {
      const error = new Error(
        "You have already borrowed this book"
      );
      error.statusCode = 400;
      throw error;
    }

    const borrow = await Borrow.create({
      member: req.user._id,
      book: book._id,
    });

    book.availableQuantity -= 1;

    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });

  } catch (error) {
    next(error);
  }
};

// Return Book

exports.returnBook = async (req, res, next) => {
  try {

    const borrow = await Borrow.findOne({
      member: req.user._id,
      book: req.params.id,
      status: "borrowed",
    });

    if (!borrow) {
      const error = new Error(
        "No active borrow record found"
      );
      error.statusCode = 404;
      throw error;
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    borrow.status = "returned";
    borrow.returnDate = new Date();

    await borrow.save();

    book.availableQuantity += 1;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });

  } catch (error) {
    next(error);
  }
};