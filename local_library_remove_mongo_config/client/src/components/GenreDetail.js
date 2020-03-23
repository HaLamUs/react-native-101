import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class GenreDetail extends Component {
  constructor() {
    super();
    this.state = {
      genre: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGenreById(match.params.id);
  }

  getGenreById(id) {
    const url = "/catalog/api/genre/" + id;
    fetch(url)
      .then(res => res.json())
      .then(genre => this.setState({ genre }));
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
      return <p> This genre has no books.</p>;
    }
  }

  render() {
    const { genre } = this.state;
    console.log("genreL", genre);

    if (genre) {
      return (
        <div className="col-lg-10">
          <h1>Genre: {genre.genre.name}</h1>
          <div className="AppLeft">
            <h4>Books</h4>
            <dl>{this.renderBooks(genre.genre_books)}</dl>
          </div>
          <hr />
          <p>
            <Link to={genre.genre.url + "/delete"}>Delete genre</Link>
          </p>
          <p>
            <Link to={genre.genre.url + "/update"}>Update genre</Link>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default GenreDetail;
