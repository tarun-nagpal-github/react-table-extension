import React, { Component } from "react";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import {FormControl, Input,  Select, Checkbox, MenuItem} from "@material-ui/core";

// react table lib
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import TableColumnFilter  from "./TableColumnFilter";
const CheckboxTable = checkboxHOC(ReactTable);

class TableExtension extends React.Component {
  constructor(props) {
    super(props);
    const columns = this.getColumns(props.parentRecords);
    this.selectedColumns = this.getSelectedColumns(columns);    
    this.state = {
        selectAll : false,
        selection: [],
        parentRecords: props.parentRecords,
        parentColumns: props.parentColumns,
        childRecords: props.childRecords,
        childColumns: props.childColumns,
        filteredColumns: columns,
        selectedColumns: this.selectedColumns
    }
  }

  handleSelectedItem = (event) => {
    let filteredColumns = [];
    let selectedColumns=event.target.value;   
 
    selectedColumns.forEach(column => {    
      let name =[];
      name.push(column)
      filteredColumns.push({
        accessor: column,
        Header: column ,
        filterMethod: (filter,  row) =>
        matchSorter(row, filter.value, { keys: name }),
        filterAll: true             
      });
    });
   
    this.setState({      
      selectedColumns:event.target.value,
      filteredColumns
    })
  }


  getColumns(data) {
    const columns = [];
    const sample = data[0];    

    Object.keys(sample).forEach(key => {
      if (key !== "_id") {
        let column=[]
        column.push(key)
        columns.push({
          accessor: key,
          Header: key,
          filterMethod: (filter, row) =>
          matchSorter(row, filter.value, { keys: column }),
          filterAll: true
        });
      }
    });
    this.filteredColumns = columns;
    return columns;
  }


  getSelectedColumns(columns) {
    let selectedColumns = [];
    columns.forEach(column => {
      if (column.Header !== "Action")
       selectedColumns.push(column.Header);
    });
    return selectedColumns;
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

  showMultiselectComponent = () => {    
    let selectedColumns = this.selectedColumns;   
    console.log("SATE");
    console.log(this.state);
    console.log("SATE");
    return (
      <div>
        <FormControl className="mb-10 ml-16"
          style={{            
            minWidth: 120,
            maxWidth: 300
          }}
        >
          <Select
            multiple
            value={this.state.selectedColumns}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={() => "Columns"}
            autoWidth
            classes={{ icon: "icon" }}
            variant="filled"
            disableUnderline
            style={{
              borderWidth: 1,
              borderColor: "#d8d8d8",
              borderStyle: "solid",
              padding: 2,
              paddingLeft: 5,
              fontSize: 12,
              width: 90
            }}
            onChange={this.handleSelectedItem}
          >
            {selectedColumns.map(name => (
              <MenuItem key={name} value={name}>
                {console.log("786786"+ this.state.selectedColumns)}
                <Checkbox
                  checked={this.state.selectedColumns.indexOf(name) > -1}
                  style={{ width: 45 }}
                />
                <span style={{ fontSize: 12 }}>{name}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  stateUpdate =  (selectedColumn, filteredColumns) => {
    this.setState({      
      selectedColumns:selectedColumn,
      filteredColumns
    })
  }
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
      <React.Fragment>
        <TableColumnFilter 
        columns={this.filteredColumns} 
        onUpdateState={this.stateUpdate}
        selectedColumns={this.selectedColumns}        
        />
     {/* <this.showMultiselectComponent /> */}
      <CheckboxTable
        ref={r => (this.checkboxTable = r)}
        data={this.state.parentRecords}        
        columns={this.state.filteredColumns}
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
                <h6>Sub Component</h6>
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
      </React.Fragment>
    );
  }
}

export default TableExtension;
