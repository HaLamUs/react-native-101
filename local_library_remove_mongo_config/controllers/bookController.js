var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");

exports.count = function(req, res) {
  async.parallel(
    {
      book_count: function(callback) {
        Book.count(callback);
      },
      book_instance_count: function(callback) {
        BookInstance.count(callback);
      },
      book_instance_available_count: function(callback) {
        BookInstance.count({ status: "Available" }, callback);
      },
      author_count: function(callback) {
        Author.count(callback);
      },
      genre_count: function(callback) {
        Genre.count(callback);
      }
    },
    function(err, results) {
      // Tạm thời chưa handle lỗi
      res.json(results);
      console.log("Sent to client");
    }
  );
};

exports.index = function(req, res) {
  async.parallel(
    {
      book_count: function(callback) {
        Book.count(callback);
      },
      book_instance_count: function(callback) {
        BookInstance.count(callback);
      },
      book_instance_available_count: function(callback) {
        BookInstance.count({ status: "Available" }, callback);
      },
      author_count: function(callback) {
        Author.count(callback);
      },
      genre_count: function(callback) {
        Genre.count(callback);
      }
    },
    function(err, results) {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results
      });
    }
  );
};

// Display list of all books
exports.book_list = function(req, res, next) {
  Book.find({}, "title author")
    .populate("author")
    .exec(function(err, list_books) {
      if (err) {
        return next(err);
      }
      //successfull, so render
      res.render("book_list", {
        title: "Book List",
        book_list: list_books
      });
    });
};

//[Json] Display list of all books
exports.book_list_json = function(req, res, next) {
  Book.find({}, "title author")
    .populate("author")
    .exec(function(err, list_books) {
      if (err) {
        return next(err);
      }
      res.json(list_books);
      console.log("Sent to client");
    });
};

// Display detail page for a specific book
exports.book_detail = function(req, res, next) {
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: function(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      // success so render
      res.render("book_detail", {
        title: "Title",
        book: results.book,
        book_instances: results.book_instance
      });
    }
  );
};

//book_detail_json
exports.book_detail_json = function(req, res, next) {
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: function(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
};

// Display book create form on GET
exports.book_create_get = function(req, res, next) {
  console.log("co vo ne");
  async.parallel(
    {
      authors: function(callback) {
        Author.find(callback);
      },
      genres: function(callback) {
        Genre.find(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres
      });
    }
  );
};

//[JSON] Display book create form on GET
exports.book_create_get_json = function(req, res, next) {
  console.log("co vo ne");
  async.parallel(
    {
      authors: function(callback) {
        Author.find(callback);
      },
      genres: function(callback) {
        Genre.find(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        authors: results.authors,
        genres: results.genres
      });
    }
  );
};

//[JSON] Handle book create on POST
/*
https://github.com/mdn/express-locallibrary-tutorial/blob/master/controllers/bookController.js
có lỗi khi add 1 array genres vao book model
*/
exports.book_create_post_json = function(req, res, next) {
  console.log("POST book_create_post", req.body);
  req.checkBody("title", "Title must not be empty.").notEmpty();
  req.checkBody("author", "Author must not be empty").notEmpty();
  req.checkBody("summary", "Summary must not be empty").notEmpty();
  req.checkBody("isbn", "ISBN must not be empty").notEmpty();

  req.sanitize("title").escape();
  req.sanitize("author").escape();
  req.sanitize("summary").escape();
  req.sanitize("isbn").escape();
  req.sanitize("title").trim();
  req.sanitize("author").trim();
  req.sanitize("summary").trim();
  req.sanitize("isbn").trim();
  // Sanitize genre array for each value individually as validator works for string value only

  if (!(req.body.genre instanceof Array)) {
    if (typeof req.body.genre === "undefined") {
      console.log("book genres sai");
      req.body.genre = [];
    } else {
      console.log("book genres dung");
      req.body.genre = new Array(req.body.genre);
    }
  }

  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre === "undefined" ? [] : req.body.genre
  });

  console.log("BOOK: " + book);

  var errors = req.validationErrors();
  if (errors) {
    console.log("[book] err 1", errors);
    // Some problems so we need to re-render our book
    console.log("GENRE: " + req.body.genre);

    console.log("ERRORS: " + errors);
    //Get all authors and genres for form
    async.parallel(
      {
        authors: function(callback) {
          Author.find(callback);
        },
        genres: function(callback) {
          Genre.find(callback);
        }
      },
      function(err, results) {
        if (err) {
          return next(err);
        }

        // Mark our selected genres as checked
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            //console.log('IS_IN_GENRES: '+results.genres[i].name);
            results.genres[i].checked = "true";
            //console.log('ADDED: '+results.genres[i]);
          }
        }

        res.render("book_form", {
          title: "Create Book",
          authors: results.authors,
          genres: results.genres,
          book: book,
          errors: errors
        });
      }
    );
  } else {
    // Data from form is valid.
    // We could check if book exists already, but lets just save.
    console.log("[book] khong bi loi validate");
    book.save(function(err) {
      if (err) {
        console.log("[book] save err", err);
        return next(err);
      }
      //successful - redirect to new book record.
      console.log("[bookinstance] save success");
      res.json(book);
      // res.redirect(book.url);
    });
  }
};

// Handle book create on POST
exports.book_create_post = function(req, res, next) {
  console.log("POST book_create_post", req.body);
  req.checkBody("title", "Title must not be empty.").notEmpty();
  req.checkBody("author", "Author must not be empty").notEmpty();
  req.checkBody("summary", "Summary must not be empty").notEmpty();
  req.checkBody("isbn", "ISBN must not be empty").notEmpty();

  req.sanitize("title").escape();
  req.sanitize("author").escape();
  req.sanitize("summary").escape();
  req.sanitize("isbn").escape();
  req.sanitize("title").trim();
  req.sanitize("author").trim();
  req.sanitize("summary").trim();
  req.sanitize("isbn").trim();
  // Sanitize genre array for each value individually as validator works for string value only
  // if (req.body.genre instanceof Array) {
  //   req.body.genre = req.body.genre.map(initialGenre => {
  //     req.body.tempGenre = initialGenre;
  //     req.sanitize("tempGenre").escape();
  //     return req.body.tempGenre;
  //   });
  //   delete req.body.tempGenre;
  // } else req.sanitize("genre").escape();

  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre === "undefined" ? [] : req.body.genre
  });

  console.log("BOOK: " + book);

  var errors = req.validationErrors();
  if (errors) {
    console.log("[book] err 1", errors);
    // Some problems so we need to re-render our book
    console.log("GENRE: " + req.body.genre);

    console.log("ERRORS: " + errors);
    //Get all authors and genres for form
    async.parallel(
      {
        authors: function(callback) {
          Author.find(callback);
        },
        genres: function(callback) {
          Genre.find(callback);
        }
      },
      function(err, results) {
        if (err) {
          return next(err);
        }

        // Mark our selected genres as checked
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            //console.log('IS_IN_GENRES: '+results.genres[i].name);
            results.genres[i].checked = "true";
            //console.log('ADDED: '+results.genres[i]);
          }
        }

        res.render("book_form", {
          title: "Create Book",
          authors: results.authors,
          genres: results.genres,
          book: book,
          errors: errors
        });
      }
    );
  } else {
    // Data from form is valid.
    // We could check if book exists already, but lets just save.
    console.log("[book] khong bi loi validate");
    book.save(function(err) {
      if (err) {
        console.log("[book] save err", err);
        return next(err);
      }
      //successful - redirect to new book record.
      console.log("[bookinstance] save success");
      res.json(book);
      // res.redirect(book.url);
    });
  }
};

// Display book delete form on GET
exports.book_delete_get = function(req, res, next) {
  // no co moi quan he vs book instances
  //get se la param
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate("genre")
          .populate("author")
          .exec(callback);
      },
      book_bookinstances: function(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.render("book_delete", {
        title: "Delete Book",
        book: results.book,
        book_bookinstances: results.book_bookinstances
      });
    }
  );
};

// Handle book delete on POST
exports.book_delete_post = function(req, res, next) {
  //set se la body
  req.checkBody("bookid", "Book Id must exist").notEmpty();
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.body.bookid)
          .populate("genre")
          .populate("author")
          .exec(callback);
      },
      book_bookinstances: function(callback) {
        BookInstance.find({ book: req.body.bookid }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.book_bookinstances.length > 0) {
        res.render("book_delete", {
          title: "Book Delete",
          book: results.book,
          book_bookinstances: results.book_bookinstances
        });
        return;
      } else {
        Book.findByIdAndRemove(req.body.bookid, function deleteBook(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/catalog/books");
        });
      }
    }
  );
};

// Display book update form on GET
exports.book_update_get = function(req, res, next) {
  req.sanitize("id").escape();
  req.sanitize("id").trim();

  //Get book, authors and genres for form
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      authors: function(callback) {
        Author.find(callback);
      },
      genres: function(callback) {
        Genre.find(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      // Mark our selected genres as checked
      for (
        var all_g_iter = 0;
        all_g_iter < results.genres.length;
        all_g_iter++
      ) {
        for (
          var book_g_iter = 0;
          book_g_iter < results.book.length;
          book_g_iter++
        ) {
          if (
            results.genres[all_g_iter]._id.toString() ==
            results.book.genre[book_g_iter]._id.toString()
          ) {
            results.genres[all_g_iter].checked = "true";
          }
        }
      }
      res.render("book_form", {
        title: "Update book",
        authors: results.authors,
        genres: results.genres,
        book: results.book
      });
    }
  );
};

// Handle book update on POST
exports.book_update_post = function(req, res, next) {
  // sanitize id passed in
  req.sanitize("id").escape();
  req.sanitize("id").trim();

  //Check other data
  req.checkBody("title", "Title must not be empty.").notEmpty();
  req.checkBody("author", "Author must not be empty").notEmpty();
  req.checkBody("summary", "Summary must not be empty").notEmpty();
  req.checkBody("isbn", "ISBN must not be empty").notEmpty();

  req.sanitize("title").escape();
  req.sanitize("author").escape();
  req.sanitize("summary").escape();
  req.sanitize("isbn").escape();
  req.sanitize("title").trim();
  req.sanitize("author").trim();
  req.sanitize("summary").trim();
  req.sanitize("isbn").trim();

  // Sanitize genre array for each value individually as validator works for string values only
  if (req.body.genre instanceof Array) {
    req.body.genre = req.body.genre.map(initialGenre => {
      req.body.tempGenre = initialGenre;
      req.sanitize("tempGenre").escape();
      return req.body.tempGenre;
    });
    delete req.body.tempGenre;
  } else req.sanitize("genre").escape();

  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre == "undefined" ? [] : req.body.genre,
    _id: req.params.id // this is required or a new ID will be assigned
  });

  var errors = req.validationErrors();
  if (errors) {
    // Re-render book with error information
    // Get all authors and genres for form
    async.parallel(
      {
        authors: function(callback) {
          Author.find(callback);
        },
        genres: function(callback) {
          Genre.find(callback);
        }
      },
      function(err, results) {
        if (err) {
          return next(err);
        }

        // Mark our selected genres as checked
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = "true";
          }
        }
        res.render("book_form", {
          title: "Update Book",
          authors: results.authors,
          genres: results.genres,
          book: book,
          errors: errors
        });
      }
    );
  } else {
    // Data from form is valid. Update the record.
    Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook) {
      if (err) {
        return next(err);
      }
      //successful - redirect to book detail page.
      res.redirect(thebook.url);
    });
  }
};
