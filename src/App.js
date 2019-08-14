import React, { Component } from "react";

// react table lib
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

import { Container, Jumbotron, Button } from "react-bootstrap";

// data records for the table
import { data } from "./utils/TableData";
const CheckboxTable = checkboxHOC(ReactTable);
// const chance = new Chance();

class App extends Component {  
  constructor(props){
    super(props)
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
      data : data,
      selection: []
    }
  }

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  // getData() {
  //   const data = testData.map(item => {
  //     // using chancejs to generate guid
  //     // shortid is probably better but seems to have performance issues
  //     // on codesandbox.io
  //     const _id = chance.guid();
  //     return {
  //       _id,
  //       ...item
  //     };
  //   });
  //   return data;
  // }

  toggleAll = () => {  
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  toggleSelection = (key, shift, row) => {
    console.log(key);    
  /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };



  render() {    
    const { toggleSelection, toggleAll, isSelected } = this;
    const { data, columns, selectAll, showFilters, anchorEl, alert} = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      // getTrProps: (s, r) => {      
      //   let selected = r ? this.isSelected(r.original._id) : false; 
      //   selected = this.isExpanded(s, r, r.index) ? true : selected;
      //   this.rowState= s;
      //   return {
      //     style: {
      //       backgroundColor: selected ? "#F4F5F8" : "inherit",
      //       border: selected ? "1px solid #D4D7DC" : "inherit"
      //     }
      //   };
      // }
    };
   
    return (
      <React.Fragment>
        <Container>
        {/* <Jumbotron>
          <h1>React Table Extension   </h1>
          <p>
           Trying to experiment with react tables
          </p>
          <p>            
            <a  target="_blank" href="https://www.npmjs.com/package/react-table" className="btn btn-primary" style={{color: "white" , cursor: "pointer"}}>React Table</a>
          </p>
        </Jumbotron>           */}
            <CheckboxTable
              ref={r => (this.checkboxTable = r)}
              data={data}
              columns={columns}
              defaultPageSize={3}
              pageSizeOptions={[3, 6]}
              showPagination={true}
              showPaginationTop={true}
              showPageJump={true}
              collapseOnSortingChange={true}              
              filterable={true}              
              {...checkboxProps}              
            />
          </Container>        
      </React.Fragment>
    );
  }
}
export default App;
