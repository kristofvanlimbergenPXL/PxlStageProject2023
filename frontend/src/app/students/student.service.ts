import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { StudentCsv } from '../models/studentCsv';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl: string = environment.baseUrls.students;
  order!: Observable<StudentCsv>;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl);
  }

  getStudentsFromCsv(worksheet: FormData): Observable<FormData> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient
      .post<FormData>(this.baseUrl + 'csv/import', worksheet, { headers })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error('Fout bij het verwerken van CSV-file!')
          );
        })
      );
  }

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(this.baseUrl + id);
  }

  addStudent(newStudent: Student): Observable<Student> {
    return this.httpClient
      .post<Student>(this.baseUrl + 'add', newStudent, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Een student met dit PXL e-mailadres bestaat al!`)
          );
        })
      );
  }

  editStudent(editStudent: Student): Observable<Student> {
    return this.httpClient
      .put<Student>(this.baseUrl + editStudent.id, editStudent, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Een student met dit PXL e-mailadres bestaat al!`)
          );
        })
      );
  }

  removeStudent(deleteStudent: Student) {
    return this.httpClient
      .delete<Student>(this.baseUrl + deleteStudent.id)
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(
              `Fout bij het verwijderen van student ${deleteStudent.lastName} ${deleteStudent.firstName}!`
            )
          );
        })
      );
  }

  getActualStudentCsv(): Observable<StudentCsv> {
    return this.httpClient.get<StudentCsv>(this.baseUrl + 'csv/' + 1);
  }

  updateStudentCsv(editedOrder: StudentCsv): Observable<StudentCsv> {
    return this.httpClient
      .put<StudentCsv>(this.baseUrl + 'csv/' + 1, editedOrder, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.toastr.error(`Fout bij het aanpassen van de volgorde!`)
          );
        })
      );
  }
}
