import React, { Component } from "react";
import { Link } from "react-router-dom";

class BookInstanceList extends Component {
  constructor() {
    super();
    this.state = {
      bookinstance_list: []
    };
  }

  componentDidMount() {
    this.getBookInstanceList();
  }

  getBookInstanceList() {
    fetch("/catalog/api/bookinstances")
      .then(res => res.json())
      .then(bookinstance_list => this.setState({ bookinstance_list }));
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
  renderMoreStatus(bookinstance) {
    if (bookinstance.status === "Available") {
      return null;
    } else {
      return <span>Due:{bookinstance.due_back_formatted}</span>;
    }
  }

  render() {
    console.log("lam", this.state.bookinstance_list);

    return (
      <div className="col-lg-10">
        <h1>Book Instance List</h1>
        <ul className="list-group">
          {this.state.bookinstance_list.map((bookinstance, index) => (
            <li className="list-group-item" key={index}>
              <Link to={bookinstance.url}>
                {bookinstance.book.title}
                :
                {bookinstance.imprint}
              </Link>
              -
              {this.renderStatus(bookinstance)}{" "}
              {this.renderMoreStatus(bookinstance)}
              {/* {bookinstance.status === "Available" && (
                <span className="text-success">{bookinstance.status}</span>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookInstanceList;
