import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  baseUrl: string = environment.baseUrls.actions;

  constructor(private httpClient:HttpClient) { }


  getExportDbFile(){
    return this.httpClient.get(this.baseUrl,{observe:'response',responseType:'blob'});
  }
}
