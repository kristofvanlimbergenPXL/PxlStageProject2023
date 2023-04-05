import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../models/company";
import {Employee} from "../models/employee";
import {EmployeeModule} from "./employee.module";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = environment.baseUrls.employees;

  constructor(private httpClient:HttpClient) { }



  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }


}
