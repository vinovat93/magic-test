import React, {useEffect} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const App = () => {

  const [rebuildFilters, setRebuildFilters] = React.useState(true)
  const [filters, setFilters] = React.useState({
    'column_one': [], 'column_two': [], 'column_three': []
  })

  const [filtersToApply, setFiltersToApply] = React.useState({
    'column_one': '', 'column_two': '', 'column_three': ''
  })

  const [data, updateData] = React.useState([
    {column_one: 'A1', column_two: 'B1', column_three: 'C1'},
    {column_one: 'A1', column_two: 'B1', column_three: 'C2'},
    {column_one: 'A1', column_two: 'B1', column_three: 'C3'},
    {column_one: 'A1', column_two: 'B2', column_three: 'C4'},
    {column_one: 'A1', column_two: 'B2', column_three: 'C5'},
    {column_one: 'A1', column_two: 'B3', column_three: 'C6'},
    {column_one: 'A2', column_two: 'B4', column_three: 'C7'},
    {column_one: 'A2', column_two: 'B5', column_three: 'C8'},
    {column_one: 'A2', column_two: 'B5', column_three: 'C9'},
    {column_one: 'A3', column_two: 'B6', column_three: 'C10'}
  ]);

  const [dataTable, setDataTable] = React.useState(data);

  const prepareFilters = () => {
    for (var row of data) {
      for (var filter in filters) {
        if (typeof row[filter] !== "undefined") {
          if (!filters[filter].includes(row[filter])) {
            filters[filter].push(row[filter])
          }
        }
      }
    }
    setFilters(filters)
  }

  useEffect(() => {
    prepareFilters()
    setRebuildFilters(false)
  }, [filters]);

  const applyFilters = () => {
    var tableData = []
    var flag = true
    for (var row of data) {
      flag = true
      for(var filter in filtersToApply){
        if(filtersToApply[filter] != ''){
          if(filtersToApply[filter] != row[filter]){
            //console.log("Filter",row,filtersToApply[filter])
            flag = false
          }
        }
      }
      if (flag){
        tableData.push(row)
      }
    }
    setDataTable(tableData)
  }

  const changeFilter = (event, column) => {
    filtersToApply[column] = event.target.value
    setFiltersToApply(filtersToApply)
    setRebuildFilters(!rebuildFilters)
    applyFilters()
  }

  const renderFilterColumn = (column) => {
    return typeof filters[column] !== undefined && (
        <Col>
          <select onChange={(e) => changeFilter(e, column)}>
            <option value={""}>Toate</option>
            {filters[column].map((value) => {
              return (
                  <option key={value} value={value}>
                    {value}
                  </option>
              );
            })
            }
          </select></Col>
    )
  }

  const renderFilters = () => {
    return Object.keys(filters).map((option, index) => {
      return renderFilterColumn(option)
    })
  }

  return (
      <Container>
        <Row>
          {renderFilters()}
        </Row>
        <div className="App" style={{marginTop: '10px'}}>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
            </thead>
            <tbody>
            {dataTable.map((value, index) => {
              return <tr key={index}>
                <td>{index}</td>
                <td>{value.column_one}</td>
                <td>{value.column_two}</td>
                <td>{value.column_three}</td>
              </tr>
            })}
            </tbody>
          </Table>
        </div>
      </Container>

  );
}

export default App;
