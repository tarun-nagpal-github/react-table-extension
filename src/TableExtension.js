import React, { Component } from "react";
import checkboxHOC from "react-table/lib/hoc/selectTable";

// react table lib
import ReactTable from "react-table";
import "react-table/react-table.css";
const CheckboxTable = checkboxHOC(ReactTable);

class TableExtension extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectAll : false,
        selection: [],
        parentRecords: props.parentRecords,
        parentColumns: props.parentColumns,
        childRecords: props.childRecords,
        childColumns: props.childColumns
    }
    
  }

  
  isSelected = key => {
    return this.state.selection.includes(key);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
        parentRecords: nextProps.parentRecords,
        parentColumns: nextProps.parentColumns,
        childRecords: nextProps.childRecords,
        childColumns: nextProps.childColumns        
    });
}


  toggleSelection = (key, shift, row) => {     
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

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const {      
      selectAll,
      showFilters,
      anchorEl,
      alert
    } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTrProps: (s, r) => {
        // someone asked for an example of a background color change
        // here it is...
        const selected = this.isSelected(r.original._id);
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit"
            // color: selected ? 'white' : 'inherit',
          }
        };
      }
    };

    return (
      <CheckboxTable
        ref={r => (this.checkboxTable = r)}
        data={this.state.parentRecords}
        columns={this.state.parentColumns}
        defaultPageSize={3}
        pageSizeOptions={[3, 6]}
        showPagination={true}
        showPaginationTop={true}
        showPageJump={true}
        collapseOnSortingChange={true}
        filterable={true}
        SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <em>
                  You can put any component you want here, even another React
                  Table!
                </em>
                <br />
                <br />
                <ReactTable
                  data={this.state.parentRecords}
                  columns={this.state.parentColumns}
                  defaultPageSize={3}
                  showPagination={false}
                  SubComponent={row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        Another Sub Component!
                      </div>
                    );
                  }}
                />
              </div>
            );
          }}
        {...checkboxProps}
      />
    );
  }
}

export default TableExtension;
