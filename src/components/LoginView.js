import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import UserLoginItem from "./Question";
import LoginListItem from "./LoginListItem";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    if (this.state.selectedUser === "") {
      console.log(`No user selected yet`);
    } else {
      const { dispatch } = this.props;
      const AUTHED_ID = this.state.selectedUser;
      dispatch(setAuthedUser(AUTHED_ID));
    }
  };

  render() {
    console.log(this.props);
    const { users, userIds } = this.props;
    return (
      <div>
        <div>
          <h4 className="center">Welcome to</h4>
          <h1 className="center">"Would You Rather..?"</h1>
          <h5 className="center">Please sign in to continue</h5>
          <h4 className="center">
            {this.state.selectedUser === ""
              ? "No User Selected"
              : `Selected User: ${users[this.state.selectedUser].name}`}
          </h4>
          <ul className="dashboard-list">
            {userIds.map((id) => {
              const { name, avatarURL } = users[id];
              return (
                <li
                  key={id}
                  onClick={() => this.setState({ selectedUser: id })}
                >
                  <LoginListItem name={name} avatarURL={avatarURL} />
                </li>
              );
            })}
          </ul>
          <h2 className="center" onClick={this.login}>
            Login
          </h2>
          {/* <button className="center" onClick={this.login}>
            {"Log In"}
          </button> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: users,
    userIds: Object.keys(users).sort((a, b) => users[a].name - users[b].name),
  };
}

export default connect(mapStateToProps)(LoginView);
