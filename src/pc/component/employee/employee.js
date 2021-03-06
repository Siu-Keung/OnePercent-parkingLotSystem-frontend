import React from 'react';
import Employee_tableContainer from '../../container/employee_tableContainer';
import Employee_headerContainer from '../../container/employee_headerContainer';
import Employee_addPopupContainer from '../../container/employee_addPopupContainer';
import PopPassWordContainer from "../../container/employeePopPasswordContainer";
import globalConfig from "../../../conf.js";
const remoteHost = globalConfig.domain;
class Employee extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const showEmployeeListfromMap = this.props.showEmployeeListfromMap;
   
    fetch(`${remoteHost}/users`, {
        method: 'GET',
        headers: 
          {'Authorization':localStorage.getItem("token")}
    })
    .then(response => response.json())
    .then(json => {
      const employeeList = json;
      console.log(employeeList);
      showEmployeeListfromMap(employeeList.filter(employee=>employee.id!=1));
    })
    .catch(function (ex) {
        console.log('parsing failed', ex)
    });
  }

  render() {
    return (
        <div>
            <Employee_headerContainer/>
            <Employee_tableContainer/>
            <Employee_addPopupContainer/>
            <PopPassWordContainer/>
        </div>
    );
  }
}

export default Employee;
