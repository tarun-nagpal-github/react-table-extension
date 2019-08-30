import React from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import matchSorter from "match-sorter";

class TableColumnFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      selectedColumns: props.selectedColumns
    }
    this.selectedColumns = props.selectedColumns
 
  }

//   handleSelectedItem = (event) => {
//     this.setState({
//       selectedColumn: event.target.value
//     }, () => this.props.onUpdateState(this.state.selectedColumn));
//   }


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
    }, () => this.props.onUpdateState(this.state.selectedColumns, this.state.filteredColumns));
  }



  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
      selectedColumn: nextProps.selectedColumn,
    });
  }

  renderSelectHTML = () => {
    let selectedColumns = this.selectedColumns;   
 
    // console.log("786786");
    // console.log(this.state.selectedColumns);
    // console.log("786786");
    // debugger;
    return (
        <div>
            { this.state.selectedColumns && 
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
                    
                  <Checkbox
                    checked={this.state.selectedColumns.indexOf(name) > -1}
                    style={{ width: 45 }}
                  />
                  <span style={{ fontSize: 12 }}>{name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            }
        </div>
      );
  }

  render() {
    return (
      <div>
        {this.renderSelectHTML()}
      </div>
    )
  }
}

export default TableColumnFilter;