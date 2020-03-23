import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class BookInstanceDetail extends Component {
  constructor() {
    super();
    this.state = {
      bookinstance: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getBookInstanceById(match.params.id);
  }

  getBookInstanceById(id) {
    const url = "/catalog/api/bookinstance/" + id;
    fetch(url)
      .then(res => res.json())
      .then(bookinstance => this.setState({ bookinstance }));
  }

  renderBooks(books) {
    if (books.length > 0) {
      return books.map((book, index) => (
        <div key={index}>
          <dt>
            <Link to={book.url}>{book.title}</Link>
          </dt>
          <dd>{book.summary}</dd>
        </div>
      ));
    } else {
      return <p> This author has no books.</p>;
    }
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
    return <span className={description}>{bookinstance.status}</span>;
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

  render() {
    const { bookinstance } = this.state;
    console.log("bookinstanceL", bookinstance);
    if (bookinstance) {
      return (
        <div className="col-lg-10">
          {/* 
  if bookinstance.status!='Available'
    p #[strong Due back:] #{bookinstance.due_back}
  */}

          <h1>ID: {bookinstance._id}</h1>
          <p>
            <strong>Title:</strong>
            <Link to={bookinstance.book.url}>{bookinstance.book.title}</Link>
          </p>
          <p>
            <strong>Imprint:</strong>
            {bookinstance.imprint}
          </p>
          <p>
            <strong>Status:</strong>
          </p>
          {this.renderStatus(bookinstance)}
          {this.renderDueBack(bookinstance)}
          <hr />
          <p>
            <Link to={bookinstance.url + "/delete"}>Delete bookinstance</Link>
          </p>
          <p>
            <Link to={bookinstance.url + "/update"}>Update bookinstance</Link>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default BookInstanceDetail;
