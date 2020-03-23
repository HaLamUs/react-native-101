import React, { Component } from "react";
import { Link } from "react-router-dom";

class GenreList extends Component {
  constructor() {
    super();
    this.state = {
      genre_list: []
    };
  }

  componentDidMount() {
    this.getGenreList();
  }

  getGenreList() {
    fetch("/catalog/api/genres")
      .then(res => res.json())
      .then(genre_list => this.setState({ genre_list }));
  }

  render() {
    console.log("lam", this.state.genre_list);
    return (
      <div className="col-lg-10">
        <h1>Genre List</h1>
        <ul className="list-group">
          {this.state.genre_list.map((genre, index) => (
            <li className="list-group-item" key={index}>
              <Link to={genre.url}> {genre.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GenreList;
