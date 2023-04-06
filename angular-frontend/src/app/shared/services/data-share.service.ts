import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }


  private dataSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();

  setData(newData: boolean) {
    this.dataSubject.next(newData);
  }
}
