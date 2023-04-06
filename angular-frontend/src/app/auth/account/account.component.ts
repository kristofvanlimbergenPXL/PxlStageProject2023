import {
  Component,
  NgZone,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { GoogleUser } from '../../models/googleUser';
import { AuthService } from '../auth.service';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../auth.state';
import { Observable, Subscription } from 'rxjs';
import { UserInfo, UserLogOut } from '../auth.actions';
import { NavItem } from 'src/app/models/nav-item';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  private subscriptions = new Subscription();
  @Select(AuthState.loggedInUser)
  loggedInUser$!: Observable<GoogleUser>;
  public token: any;

  public googleUser: GoogleUser | undefined | null;

  navItem: NavItem = {
    title: 'Login',
    icon: 'account_circle',
    route: '/login',
  };
  dropdownOpen: boolean = false;
  @ViewChild('accountDropdown') accountDropdown!: ElementRef;

  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone,
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.clickout;
  }

  ngOnInit(): void {
    this.service.getGoogleUser().subscribe({
      next: (res) => {
        this.googleUser = res;
      },
    });
  }

  public logout() {
    this.service.logOut().subscribe({
      next: (res) => {
        this.googleUser = null;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (this.googleUser != null) {
      if (this.accountDropdown.nativeElement.contains(event.target)) {
        document!.getElementById('accountDropdown')!.classList.toggle('show');
      } else {
        this.renderer.removeClass(
          document!.getElementById('accountDropdown'),
          'show'
        );
      }
    }
  }

  onLoginClick() {
    this.service.logIn().subscribe({
      next: (res) => {
        this.googleUser = res;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
