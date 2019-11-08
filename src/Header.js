import React from "react";
import { Jumbotron } from "react-bootstrap";

function Header() {
  return (
    <Jumbotron>
      <h1>React Table Extension   </h1>
      <p>
        Trying to experiment with react tables
        </p>
      <p>
        <a target="_blank" href="https://www.npmjs.com/package/react-table" className="btn btn-primary" style={{ color: "white", cursor: "pointer" }}>React Table</a>
      </p>
    </Jumbotron>
  )
}

export default Header;