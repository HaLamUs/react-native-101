import React, { Component } from "react";

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      authors: [],
      genre: "",
      genresKey: [],
      genres: [],
      summary: "",
      isbn: "",
      results: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  genres là 1 mảng array 
  1. UI khi select 1 array
  2. send to server 
  */

  handleChange(event) {
    const target = event.target;
    //không được đổi giá trị trực tiếp
    if (target.type === "checkbox") {
      const genresKey = this.state.genresKey.slice(); // copy cat
      if (target.checked) {
        genresKey.push(target.value);
        // console.log("checked " + genresKey + " value add " + target.value);
        this.setState({ genresKey });
      } else {
        let genresKey2 = genresKey.filter(item => item !== target.value);
        // console.log("unchecked ", genresKey.length);
        // console.log(
        //   "unchecked " + genresKey2 + " value remove " + target.value
        // );
        this.setState({ genresKey: genresKey2 });
      }
    } else {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    data.set("title", data.get("title"));
    data.set("summary", data.get("summary"));
    data.set("isbn", data.get("isbn"));
    data.set("author", data.get("author"));
    data.set("genre", this.state.genresKey);
    console.log(
      "[SEND] data[title] " +
        data.get("title") +
        "[summary]" +
        data.get("summary") +
        " [isbn] " +
        data.get("isbn") +
        " [author] " +
        data.get("author") +
        " [genre] " +
        data.get("genre")
    );
    // fetch("/catalog/api/books/create")
    fetch("/catalog/api/books/create", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(book => this.redirectToUrl(book));
  }

  redirectToUrl(book) {
    this.props.history.push(book.url);
  }

  componentDidMount() {
    this.getAuthorList();
  }

  getAuthorList() {
    fetch("/catalog/api/books/create")
      .then(res => res.json())
      .then(results => this.setStateAfterGet(results));
  }

  setStateAfterGet(results) {
    this.setState({
      authors: results.authors,
      genres: results.genres
    });
  }

  render() {
    return (
      <div>
        <h1>Create Book</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              placeholder="Name of book"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>Author:</label>
          <select
            value={this.state.author}
            name="author"
            onChange={this.handleChange}
          >
            {this.state.authors.map((author, index) => (
              <option value={author._id} key={index}>
                {author.name}
              </option>
            ))}
          </select>
          <br />
          <label>
            Summary:
            <textarea
              value={this.state.summary}
              name="summary"
              onChange={this.handleChange}
              placeholder="Summary"
            />
          </label>
          <br />
          <label>
            ISBN:
            <input
              type="text"
              placeholder="ISBN13"
              name="isbn"
              value={this.state.isbn}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>Genre:</label>
          <br />
          {this.state.genres.map((genre, index) => (
            <label key={index}>
              {genre.name}
              <input
                type="checkbox"
                name="genre"
                value={genre._id}
                key={index}
                /* {checked={this.state.genre === genre._id} }*/
                checked={this.genreIsChecked(genre._id)}
                onChange={this.handleChange}
              />
            </label>
          ))}
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }

  genreIsChecked(id) {
    // if (this.state.genresKey.indexOf(id) === -1) {
    //   // console.log("khong co");
    //   return false;
    // } else {
    //   return true;
    // }
    return this.state.genresKey.indexOf(id) !== -1;
  }
}

export default BookForm;
