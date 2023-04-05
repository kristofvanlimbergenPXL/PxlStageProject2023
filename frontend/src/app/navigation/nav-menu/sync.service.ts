import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  baseUrl: string = environment.baseUrls.googleSheetSync;

  constructor(private httpClient: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem('token');
  };

  syncGoogleDriveFile(selectedSheet: any): Observable<any> {
    let googleSheet = {
      selectedSheetId: localStorage.getItem('selectedSheetId'),
      token: '',
      SelectSheet: selectedSheet,
    };

    return this.httpClient.post<any>(this.baseUrl + '/sync', googleSheet, {
      headers: { 'content-type': 'application/json' },
    });
  }
}
