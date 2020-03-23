import React, { Component } from "react";
import "./App.css";

class Profile extends Component {
  render() {
    let brew = { id: "", name: "", image_url: "", food_pairing: [] };
    if (this.props.brew !== null) {
      brew = this.props.brew;
    }

    return (
      <div className="profile">
        <img src={brew.image_url} alt="Profile" className="profile-img" />
        <div className="profile-info">
          <div className="profile-id">
            Brew ID {brew.id}
          </div>
          <div className="profile-name">
            Brew Name {brew.name}
          </div>
          <div className="profile-food">
            {brew.food_pairing.map((food, index) => {
              food =
                food !== brew.food_pairing[brew.food_pairing.length - 1]
                  ? `${food}, `
                  : `${food}`;
              return (
                <span key={index}>
                  {food}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
