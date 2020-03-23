import React, { Component } from "react";
import { Link } from "react-router-dom";

class AuthorList extends Component {
  constructor() {
    super();
    this.state = {
      author_list: []
    };
  }

  componentDidMount() {
    this.getAuthorList();
  }

  getAuthorList() {
    fetch("/catalog/api/authors")
      .then(res => res.json())
      .then(author_list =>
        this.setState({
          author_list
        })
      );
  }

  render() {
    console.log("author list", this.state.author_list);
    return (
      <div className="col-lg-10">
        <h1>Author List</h1>
        <ul className="list-group">
          {this.state.author_list.map((author, index) => (
            <li className="list-group-item" key={index}>
              <Link to={author.url}>{author.name}</Link>
              - {author.lifespan}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorList;
