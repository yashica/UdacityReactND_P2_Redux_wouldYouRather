import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser"; //authedUser actionCreator
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "page1" };
  }

  logout = (e) => {
    e.preventDefault();
    console.log("LOGOUT!");
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
    //     dispatch(setAuthedUser(authedUser) ) from "../actions/authedUser"; //authedUser actionCreator
    // );
  };

  render() {
    const { authedUser, userName, avatarURL } = this.props;
    console.log(this.props);
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
        </ul>
        {authedUser && (
          <ul className="authedUser">
            {/* <li>Hello {user.name}</li> */}
            <img
              src={avatarURL}
              alt={`Avatar of ${userName}`}
              className="avatar_small"
            />
            <li>Hello, {userName}!</li>
            <li>
              <button onClick={this.logout}>Logout</button>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];
  console.log("InNavbar");
  console.log({ user: user });
  return {
    authedUser: authedUser,
    userName: user ? user.name : "",
    avatarURL: user ? user.avatarURL : "",
  };
}

export default connect(mapStateToProps)(NavBar);
