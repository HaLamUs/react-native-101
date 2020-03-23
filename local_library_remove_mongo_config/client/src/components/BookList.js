import React, { Component } from "react";
import { Link } from "react-router-dom";

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      book_list: []
    };
  }

  componentDidMount() {
    this.getBookList();
  }

  getBookList() {
    fetch("/catalog/api/books")
      .then(res => res.json())
      .then(book_list => this.setState({ book_list }));
  }

  render() {
    console.log("book_list lll", this.state.book_list);
    // const { book_list } = this.state;
    return (
      <div className="col-lg-10">
        <h1>Book List</h1>
        <ul className="list-group">
          {this.state.book_list.map((book, index) => (
            <li className="list-group-item" key={index}>
              <Link to={book.url}>{book.title}</Link>
              (#{book.author.name})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookList;
