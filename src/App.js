import React, { Component } from "react";

// react table lib
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

import { Container, Jumbotron, Button } from "react-bootstrap";

// data records for the table
import { data } from "./utils/TableData";
const CheckboxTable = checkboxHOC(ReactTable);

class App extends Component {
  constructor(props) {
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
      data: data
    };
  }

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
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
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
    const {
      data,
      columns,
      selectAll
    } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox"
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
          <Jumbotron>
            <h1>React Table Extension </h1>
            <p>Trying to experiment with react tables</p>
            <p>
              {/* <Button variant="primary">Learn more</Button> */}
              <a
                target="_blank"
                href="https://www.npmjs.com/package/react-table"
                className="btn btn-primary"
                style={{ color: "white", cursor: "pointer" }}
              >
                React Table
              </a>
            </p>
          </Jumbotron>

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
            resizable={true}
            filterable={true}
            isSelected={true}
            className="-striped -highlight grid"
            {...checkboxProps}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
