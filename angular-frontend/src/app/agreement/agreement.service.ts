import {Injectable} from '@angular/core';
import {Agreement} from "../models/agreement";
import {Employee} from "../models/employee";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  baseUrl: string = environment.baseUrls.agreements;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  editAgreement(editAgreement: Agreement): Observable<Agreement> {
    return this.httpClient
      .put<Agreement>(this.baseUrl + '/' + editAgreement.id, editAgreement, {
        headers: {'content-type': 'application/json'},
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Een agreement met dit id bestaat al!`)
          );
        })
      );
  }

  addAgreement(employeeId: number, newAgreement: Agreement) {

    return this.httpClient
      .post<Agreement>(this.baseUrl + '/' + employeeId, newAgreement, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Een agreement met dit id bestaat al!`)
          );
        })
      );
  }


}
