import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Employee} from "../models/employee";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {EmployeeDetail} from "../models/employeeDetail";
import {EmployeeAddress} from "../models/EmployeeAddress";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = environment.baseUrls.employees;

  constructor(private httpClient:HttpClient,private toastr: ToastrService) { }



  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id:number):Observable<EmployeeAddress>{
    return this.httpClient.get<EmployeeAddress>(`${this.baseUrl}/${id}`);
  }

  deleteEmployee(id: any):Observable<unknown>{
    return  this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    return this.httpClient
      .post<Employee>(this.baseUrl, newEmployee, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Een employee met dit rijksregisternummer bestaat al!`)
          );
        })
      );
  }

  editEmployee(editEmployee: Employee): Observable<Employee> {
    return this.httpClient
      .put<Employee>(this.baseUrl+'/' + editEmployee.id, editEmployee, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Een employee met dit rijksregisternummer bestaat al!`)
          );
        })
      );
  }



}




