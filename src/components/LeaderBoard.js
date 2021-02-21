import React, { Component } from "react";
import { connect } from "react-redux";
import UserRankingItem from "./UserRankingItem";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "page1" };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <h3 className="center">User Ranking</h3>
        </div>
        <ul className="dashboard-list">
          {this.props.userRankingList.map((id, index) => (
            <li key={id}>
              <UserRankingItem id={id} ranking={index + 1} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  let userRankingList = Object.values(users)
    .sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length)
    )
    .map((value) => value.id);
  console.log("userRankingList");
  console.log(userRankingList);

  return {
    userRankingList: userRankingList,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
