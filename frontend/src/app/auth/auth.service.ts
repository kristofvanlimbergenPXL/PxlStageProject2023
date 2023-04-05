import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GoogleUser } from '../models/googleUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrls.actions;

  constructor(private httpClient: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem('token');
  };

  isLoggedIn(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + 'isloggedin');
  }

  logIn(): Observable<GoogleUser> {
    return this.httpClient.get<GoogleUser>(this.baseUrl + 'login');
  }

  logOut(): Observable<unknown> {
    return this.httpClient.get(this.baseUrl + 'logout');
  }

  getGoogleUser(): Observable<GoogleUser | null> {
    return this.httpClient.get<GoogleUser | null>(
      this.baseUrl + 'get-user-info'
    );
  }

  GetUserInfo(token: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get(
      `${environment.googleApiBaseUrl}oauth2/v1/userinfo?access_token=${token}`,
      { headers: header }
    );
  }
}
