import React, { Component } from "react";

class LoginListItem extends Component {
  render() {
    const { name, avatarURL } = this.props;
    return (
      <div className="tweet">
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className="avatar_small"
        />
        <div className="login_name">
          <span>{name}</span>
        </div>
      </div>
    );
  }
}

export default LoginListItem;
