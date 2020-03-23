import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      brew: null,
      tracks: []
    };
  }

  search() {
    console.log(this.state.query);
    const BASE_URL = "https://api.spotify.com/v1/search?"; // dấu chấm hỏi để phân biệt param
    // const FETCH_URL =
    //   BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    const FETCH_URL_2 = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log("Fetch_url ", FETCH_URL_2);

    let POOR_URL = "https://api.punkapi.com/v2/beers/random";
    fetch(POOR_URL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        const brew = json[0];
        console.log("brew ", brew);
        this.setState({ brew });
        const tracks = json[0].ingredients.hops;
        this.setState({ tracks });
        // below this we dont use but it nice
        // POOR_URL = `${BASE_URL}\${brew.id}/top-tracks?country=US`;
        // //call fetch hell
        // fetch(POOR_URL, {
        //   method: "GET"
        // })
        //   .then(response => response.json())
        //   .then(json => {
        //     const { tracks } = json; // es6
        //     //const {tracks /*, album, years*/} //const tracks = json.tracks;
        //     this.setState({ tracks });
        //   });
      });
  }

  // trong JSX đoạn bọc trong return phải có div
  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master from App</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artis"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.brew !== null ? (
          <div>
            <Profile brew={this.state.brew} />
            <Gallery tracks={this.state.tracks} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
