import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { UserInfo } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private clientId = environment.clientId;
  private token: any;

  constructor(
    private router: Router,
    private _ngZone: NgZone,
    private store: Store,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      this.token = new URLSearchParams(fragment!).get('access_token');
      if (this.token != null) {
        this.getUserInfo(this.token);
      }
    });

    if (localStorage.getItem('token') != null) {
      this._ngZone.run(() => {
        this.router.navigate(['/settings']);
      });
    }
  }

  async getUserInfo(token: string) {
    this.store.dispatch(new UserInfo(token)).subscribe({
      next: () => {
        this._ngZone.run(() => {
          this.router
            .navigate(['/settings'])
            .then(() => window.location.reload());
        });
      },
      error: (error: any) => {
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }

  oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = environment.oauth2Endpoint;

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: this.clientId,
      redirect_uri: environment.redirectUri,
      response_type: environment.responseType,
      scope: environment.scope,
      include_granted_scopes: environment.includeGrantedScopes,
      state: environment.state,
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      // @ts-ignore
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  }
}
