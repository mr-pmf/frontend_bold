import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopBar extends Component {
  render() {
    return (
      <ol>
        <li style={{ float: "left" }}>
          <Link
            className="active"
            to={{
              pathname: "/main"
            }}
          >
            Beverage Cellar
          </Link>
        </li>
        <li style={{ float: "right" }}>
          <Link
            to={{
              pathname: "/"
            }}
          >
            Logout
          </Link>
        </li>
        <li style={{ float: "right" }}>
          <Link
            to={{
              pathname: "/add_bottle"
            }}
            title="Add New Bottle"
          >
            Add New Bottle
          </Link>
        </li>
      </ol>
    );
  }
}

export default TopBar;
