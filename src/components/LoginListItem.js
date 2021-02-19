import React, { Component } from "react";

class LoginListItem extends Component {
  render() {
    const { name, avatarURL } = this.props;
    // return <div>{name}</div>;
    return (
      <div className="tweet">
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className="avatar_small"
        />
        <span>{name}</span>
        {/* <div className="tweet-info">
          <span>{name}</span>
        </div> */}
      </div>
    );
  }
}

export default LoginListItem;
