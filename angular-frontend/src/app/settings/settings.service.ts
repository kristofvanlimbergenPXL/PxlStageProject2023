import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  baseUrl: string = environment.baseUrls.actions;
  googleSheetBaseUrl: string = environment.baseUrls.googleSheetSync;

  constructor(private httpClient: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem('token');
  };

  GetGoogleDriveFiles(token: string): Observable<any> {
    return this.httpClient.get(`${this.googleSheetBaseUrl}/list-sheets`);
  }

  //check if DB contains data??
  dbContainsData(): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.baseUrl + 'data');
  }

  generateBlackBoardLinks(schoolYear: string): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.googleSheetBaseUrl}/generate-blackboard-link/${schoolYear}`
    );
  }
}
