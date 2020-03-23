import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

class GenreForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //sẽ handle not empty ở đây
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    data.set("name", data.get("name"));
    console.log("[SEND] data ", data.get("name"));
    fetch("/catalog/api/genre/create", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      // .then(genre => console.log(genre));
      .then(genre => this.redirectToUrl(genre));
    //<Link to={genre.genre.url + "/update"}>Update genre</Link>
  }

  redirectToUrl(genre) {
    console.log("lam " + genre.url);
    this.props.history.push(genre.url);
    // cái redirect bị gì
    /* <Redirect to="http://localhost:3000/genre/5a7875ed404fbc16b6b11c3b" />; */
  }

  render() {
    return (
      <div>
        <h1>Create Genre</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            GenreL:
            <input
              type="text"
              name="name"
              className="form-control"
              value={this.state.value}
              onChange={this.handleChange}
            />
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

export default GenreForm;
