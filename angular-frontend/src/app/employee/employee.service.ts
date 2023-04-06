import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {environment} from "../../environments/environment";
import {Proposal} from "../models/proposal";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = environment.baseUrls.employees;

  constructor(private httpClient:HttpClient) { }



  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  deleteEmployee(id:number):Observable<unknown>{
    return  this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

}
