import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class BookDetail extends Component {
  constructor() {
    super();
    this.state = {
      book: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getBookById(match.params.id);
  }

  getBookById(id) {
    const url = "/catalog/api/book/".concat(id);
    fetch(url)
      .then(res => res.json())
      .then(book => this.setState({ book }));
  }

  renderStatus(bookinstance) {
    let description;
    if (bookinstance.status === "Available") {
      description = "text-success";
    } else if (bookinstance.status === "Maintenance") {
      description = "text-danger";
    } else {
      description = "text-warning";
    }
    return <p className={description}>{bookinstance.status}</p>;
  }

  renderDueBack(bookinstance) {
    if (bookinstance.status === "Available") {
      return null;
    } else {
      return (
        <p>
          <strong>Due back:</strong>
          {bookinstance.due_back}{" "}
        </p>
      );
    }
  }

  renderBookInstance(book_instance) {
    if (book_instance.length > 0) {
      return book_instance.map((bookinstance, index) => (
        <div key={index}>
          <hr />
          {this.renderStatus(bookinstance)}
          <p>
            <strong>Imprint:</strong>
            {bookinstance.imprint}
          </p>
          {this.renderDueBack(bookinstance)}
          <p>
            <strong>Id:</strong>
            <Link to={bookinstance.url}>{bookinstance._id}</Link>
          </p>
          <hr />
        </div>
      ));
    } else {
      return <p> There are no copies of this book in the library.</p>;
    }
  }

  render() {
    // const { match } = this.props; // phải đúng y sì chữ match
    console.log("lam id", this.state.book);
    const { book } = this.state;
    if (book) {
      return (
        <div className="col-lg-10">
          <h1>Title: {book.book.title}</h1>
          <p>
            <strong>Author:</strong>
            <Link to={book.book.author.url}>{book.book.author.name}</Link>
          </p>
          <p>
            <strong>Sumary:</strong>
            {book.book.summary}
          </p>
          <p>
            <strong>ISBN:</strong>
            {book.book.isbn}
          </p>
          <p>
            <strong>Genre:</strong>
            {book.book.genre.map((genre, index) => (
              <Link to={genre.url} key={index}>
                {genre.name}
              </Link>
            ))}
          </p>
          <div className="AppLeft">
            <h4>Copies</h4>
            {this.renderBookInstance(book.book_instance)}
          </div>
          <p>
            <Link to={book.book.url + "/delete"}>Delete Book</Link>
          </p>
          <p>
            <Link to={book.book.url + "/update"}>Update Book</Link>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default BookDetail;
