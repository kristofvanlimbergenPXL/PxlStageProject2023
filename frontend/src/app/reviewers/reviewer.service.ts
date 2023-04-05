import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reviewer } from '../models/reviewer';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ReviewerService {
  baseUrl: string = environment.baseUrls.reviewers;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getReviewers(): Observable<Reviewer[]> {
    return this.httpClient.get<Reviewer[]>(this.baseUrl);
  }

  getReviewer(id: number): Observable<Reviewer> {
    return this.httpClient.get<Reviewer>(`${this.baseUrl}/${id}`);
  }

  addReviewer(reviewer: Reviewer) {
    return this.httpClient
      .post(`${this.baseUrl}/add`, reviewer, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Reviewer met dit e-mailadres bestaat al.`)
          );
        })
      );
  }

  updateReviewer(reviewer: Reviewer): Observable<Reviewer> {
    return this.httpClient
      .put<Reviewer>(`${this.baseUrl}/${reviewer.id}/update`, reviewer)
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Reviewer met dit e-mailadres bestaat al.`)
          );
        })
      );
  }

  deleteReviewer(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}/remove`);
  }
}
