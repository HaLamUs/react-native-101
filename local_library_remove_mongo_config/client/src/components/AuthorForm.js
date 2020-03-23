import React, { Component } from "react";

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      family_name: "",
      date_of_birth: "",
      date_of_death: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    // console.log("name " + name);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    data.set("first_name", data.get("first_name"));
    data.set("family_name", data.get("family_name"));
    data.set("date_of_birth", data.get("date_of_birth"));
    data.set("date_of_death", data.get("date_of_death"));
    console.log(
      "[SEND] data[first_name] " +
        data.get("first_name") +
        "[family_name]" +
        data.get("family_name") +
        " [date_of_birth] " +
        data.get("date_of_birth") +
        " [date_of_death] " +
        data.get("date_of_death")
    );
    fetch("/catalog/api/author/create", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(author => this.redirectToUrl(author));
  }

  redirectToUrl(author) {
    this.props.history.push(author.url);
  }

  render() {
    return (
      <div>
        <h1>Create Author</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              placeholder="First name (Christian) last"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Family Name:
            <input
              type="text"
              placeholder="Family name (surname)"
              name="family_name"
              value={this.state.family_name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>Date of birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={this.state.date_of_birth}
            onChange={this.handleChange}
          />
          <br />
          <label>Date of death:</label>
          <input
            type="date"
            name="date_of_death"
            value={this.state.date_of_death}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AuthorForm;
