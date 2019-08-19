import React, { Component } from "react";

import  TableExtension from "./TableExtension";
import { data } from "./utils/TableData";
import Header from "./Header";
import { Container, columns } from "react-bootstrap";

class App extends Component {  
  constructor(props){
    super(props);  
    this.state = {
      selectAll: false,
      columns: [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Age",
          accessor: "age"
        }   
      ],
      data: data,
      selection: []
    };  
  }

  render() {       
    return (
      <React.Fragment>
        <Container>
            <Header />
            <TableExtension parentRecords={this.state.data} parentColumns={this.state.columns} />
          </Container>        
      </React.Fragment>
    );
  }
}
export default App;
