import React, { Component } from "react";

class BookInstanceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueBook: "",
      imprint: "",
      book_list: [],
      valueDue: "",
      valueStatus: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getBookList();
  }

  getBookList() {
    fetch("/catalog/api/bookinstances/create")
      .then(res => res.json())
      .then(book_list => this.setState({ book_list }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.name === "imprint") {
      this.setState({ imprint: value });
    } else if (target.name === "book") {
      this.setState({ valueBook: value });
    } else if (target.name === "due_back") {
      this.setState({ valueDue: value });
    } else if (target.name === "status") {
      this.setState({ valueStatus: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    data.set("book", data.get("book"));
    data.set("imprint", data.get("imprint"));
    data.set("due_back", data.get("due_back"));
    data.set("status", data.get("status"));
    console.log(
      "[SEND] data[book] " +
        data.get("book") +
        "[imprint]" +
        data.get("imprint") +
        " [due_back] " +
        data.get("due_back") +
        " [status] " +
        data.get("status")
    );
    fetch("/catalog/api/bookinstances/create", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(bookinstance => this.redirectToUrl(bookinstance));
  }

  redirectToUrl(bookinstance) {
    this.props.history.push(bookinstance.url);
  }

  render() {
    return (
      <div>
        <h1> Create BookInstance</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Book:</label>
          <select
            value={this.state.valueBook}
            name="book"
            onChange={this.handleChange}
          >
            {this.state.book_list.map((book, index) => (
              <option value={book._id} key={index}>
                {book.title}
              </option>
            ))}
          </select>
          <br />
          <label>
            Imprint:
            <input
              type="text"
              placeholder="Publisher and date information"
              name="imprint"
              value={this.state.valueIM}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>Date when book available:</label>
          <input
            type="date"
            name="due_back"
            value={this.state.valueDue}
            onChange={this.handleChange}
          />
          <br />
          <label>
            Status:
            <select
              value={this.state.valueStatus}
              name="status"
              onChange={this.handleChange}
            >
              <option value="Maintenance">Maintenance</option>
              <option value="Available">Available</option>
              <option value="Loaned">Loaned</option>
              <option value="Reserved">Reserved</option>
            </select>
          </label>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default BookInstanceForm;
