import {EmployeeDetail} from "./employeeDetail";
import {Address} from "./Address";

export class EmployeeAddress{

  employee:EmployeeDetail;
  address:Address;

  constructor(employee: EmployeeDetail, address: Address) {
    this.employee = employee;
    this.address = address;
  }
}
