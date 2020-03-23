import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class AuthorDetail extends Component {
  constructor() {
    super();
    this.state = {
      author: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getAuthorById(match.params.id);
  }

  getAuthorById(id) {
    const url = "/catalog/api/author/" + id;
    fetch(url)
      .then(res => res.json())
      .then(author => this.setState({ author }));
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

  render() {
    const { author } = this.state;
    console.log("authorL", author);
    if (author) {
      return (
        <div className="col-lg-10">
          <h1>Author: {author.author.name}</h1>
          <p>
            {author.author.date_of_birth} - {author.author.date_of_death}
          </p>
          <div className="AppLeft">
            <h4>Books</h4>
            <dl>{this.renderBooks(author.authors_books)}</dl>
          </div>
          <hr />
          <p>
            <Link to={author.author.url + "/delete"}>Delete author</Link>
          </p>
          <p>
            <Link to={author.author.url + "/update"}>Update author</Link>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AuthorDetail;
