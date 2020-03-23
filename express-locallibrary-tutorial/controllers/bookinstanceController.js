var BookInstance = require("../models/bookinstance");
var Book = require("../models/book");

var async = require("async");

// Display list of all BookInstances
exports.bookinstance_list = function(req, res, next) {
  BookInstance.find()
    .populate("book") // thay bookid = doi tuong book, vc werid
    .exec(function(err, list_bookinstances) {
      if (err) {
        return next(err);
      }
      //successful so render
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances
      });
    });
};

// Display detail page for a specific BookInstance
exports.bookinstance_detail = function(req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function(err, bookinstance) {
      if (err) {
        return next(err);
      }
      //successfull so render
      res.render("bookinstance_detail", {
        title: "Book:",
        bookinstance: bookinstance
      });
    });
};

// Display BookInstance create form on GET
exports.bookinstance_create_get = function(req, res, next) {
  Book.find({}, "title").exec(function(err, books) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books
    });
  });
};

// Handle BookInstance create on POST
exports.bookinstance_create_post = function(req, res, next) {
  req.checkBody("book", "Book must be specified").notEmpty(); //We won't force Alphanumeric, because book titles might have spaces.
  req.checkBody("imprint", "Imprint must be specified").notEmpty();
  req
    .checkBody("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601();

  req.sanitize("book").escape();
  req.sanitize("imprint").escape();
  req.sanitize("status").escape();
  req.sanitize("book").trim();
  req.sanitize("imprint").trim();
  req.sanitize("status").trim();

  //Run the validators because below code will modify the value of due_back which will cause validation error
  var errors = req.validationErrors();
  req.sanitize("due_back").toDate();

  var bookinstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back
  });
  if (errors) {
    Book.find({}, "title").exec(function(err, books) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: books,
        selected_book: bookinstance.book._id,
        errors: errors,
        bookinstance: bookinstance
      });
    });
    return;
  } else {
    // data from form is valid
    bookinstance.save(function(err) {
      if (err) {
        return next(err);
      }
      //successful - redirect to new book-instance record.
      res.redirect(bookinstance.url);
    });
  }
};

// Display BookInstance delete form on GET
exports.bookinstance_delete_get = function(req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function(err, bookinstance) {
      if (err) {
        return next(err);
      }
      //successful so render
      res.render("bookinstance_delete", {
        title: "BookInstance Delete",
        bookinstance: bookinstance
      });
    });
};

// Handle BookInstance delete on POST
exports.bookinstance_delete_post = function(req, res, next) {
  req.checkBody("bookinstanceid", "Bookinstance id must exist").notEmpty();

  BookInstance.findByIdAndRemove(
    req.body.bookinstanceid,
    function deleteBookInstance(err) {
      if (err) {
        return next(err);
      }
      //Success - got to author list
      res.redirect("/catalog/bookinstances");
    }
  );
};

// Display BookInstance update form on GET
exports.bookinstance_update_get = function(req, res, next) {
  req.sanitize("id").escape();
  req.sanitize("id").trim();

  async.parallel(
    {
      bookinstance: function(callback) {
        BookInstance.findById(req.params.id)
          .populate("book")
          .exec(callback);
      },
      books: function(callback) {
        // Book.find({"genre": req.params.id}, callback) // sai vì mình không cần tìm đúng chính xác, tìm all để đó cập nhật lại
        Book.find(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.render("bookinstance_form", {
        title: "Bookinstance Update",
        bookinstance: results.bookinstance,
        book_list: results.books,
        selected_book: results.bookinstance.book._id
      });
    }
  );
};

// Handle bookinstance update on POST
exports.bookinstance_update_post = function(req, res, next) {
  // sanitize id passed in
  req.sanitize("id").escape();
  req.sanitize("id").trim();

  // check other data
  req.checkBody("imprint", "imprint must not be empty").notEmpty();
  req.checkBody("status", "status must not be empty").notEmpty();
  req
    .checkBody("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601();
  req.checkBody("book", "book must not be empty").notEmpty();

  req.sanitize("imprint").escape();
  req.sanitize("status").escape();
  req.sanitize("due_back").escape();
  req.sanitize("book").escape();
  req.sanitize("imprint").trim();
  req.sanitize("status").trim();
  req.sanitize("due_back").trim();
  req.sanitize("book").trim();

  var bookinstance = new BookInstance({
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
    book: req.body.book,
    _id: req.params.id
  });
  var error = req.validationErrors();
  req.sanitize("due_back").toDate();
  if (error) {
    Book.find({}, "title").exec(function(err, books) {
      if (err) {
        return next(err);
      }
      res.render("bookinstance_form", {
        title: "Bookinstance Update",
        bookinstance: bookinstance,
        book_list: books,
        selected_book: bookinstance.book._id
      });
    });
    return;
  } else {
    // data from form is valid. Update the record
    BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function(
      err,
      bookinstance
    ) {
      if (err) {
        return next(err);
      }
      res.redirect(bookinstance.url);
    });
  }
};
