import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, tap, throwError} from "rxjs";
import {Company} from "../models/company";
import {CompanyContact} from "../models/companyContact";
import {CompanyPromotor} from "../models/companyPromotor";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl: string = environment.baseUrls.companies;


  constructor(private httpClient:HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.baseUrl);
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(this.baseUrl+id);
  }

  editContact(person:CompanyContact):Observable<CompanyContact>{
    return this.httpClient.put<CompanyContact>(this.baseUrl+'contact',person);
  }

  editPromotor(person:CompanyPromotor):Observable<CompanyPromotor>{
    return this.httpClient.put<CompanyPromotor>(this.baseUrl+'promotor',person);
  }



}

