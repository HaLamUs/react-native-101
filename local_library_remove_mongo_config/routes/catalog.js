var express = require("express");
var router = express.Router();

// require controller modules
var book_controller = require("../controllers/bookController");
var author_controller = require("../controllers/authorController");
var genre_controller = require("../controllers/genreController");
var book_instance_controller = require("../controllers/bookinstanceController");

/// BOOK ROUTES ///

// GET catalog home page
router.get("/", book_controller.index);

// Get catalog JSON home page
router.get("/api/count", book_controller.count);

//Get book list JSON
router.get("/api/books", book_controller.book_list_json);

// Get author list JSON
router.get("/api/authors", author_controller.author_list_json);

// Get genre list JSON
router.get("/api/genres", genre_controller.genre_list_json);

// Get bookinstances list JSON
router.get(
  "/api/bookinstances",
  book_instance_controller.bookinstance_list_json
);

/* GET request for one Book JSON*/
router.get("/api/book/:id", book_controller.book_detail_json);

/* GET request for one Author. JSON */
router.get("/api/author/:id", author_controller.author_detail_json);

/* GET request for one Genre.JSON */
router.get("/api/genre/:id", genre_controller.genre_detail_json);

/* GET request for one Book Instance .JSON */
router.get(
  "/api/bookinstance/:id",
  book_instance_controller.bookinstance_detail_json
);

//genre_create_post
router.post("/api/genre/create", genre_controller.genre_create_post);

//bookinstance_create_post
// "/api/bookinstances"
router.get(
  "/api/bookinstances/create",
  book_instance_controller.bookinstance_lol
);

router.post(
  "/api/bookinstances/create",
  book_instance_controller.bookinstance_create_post
);

router.post("/api/author/create", author_controller.author_create_post);

router.get("/api/books/create", book_controller.book_create_get_json);
///catalog/api/books/create
router.post("/api/books/create", book_controller.book_create_post);

module.exports = router;
