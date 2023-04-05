import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavItem } from 'src/app/models/nav-item';
import { SyncService } from './sync.service';
import { ExportService } from '../../settings/export.service';
import { Router } from '@angular/router';
import { DataShareService } from "../../shared/services/data-share.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() isExpanded!: boolean;
  @Output() isExpandedChange = new EventEmitter<boolean>();

  @Input() navBarOpen: boolean = false;
  @Output() navBarOpenChange = new EventEmitter<boolean>();

  baseUrl: string = environment.baseUrls.googleSheetSync;
  isLoading: boolean = false;

  navItems: NavItem[] = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { title: 'Stagevoorstellen', icon: 'home', route: '/proposals' },
    { title: 'Reviewers', icon: 'speaker_notes', route: '/reviewers' },
    { title: 'Studenten', icon: 'collections_bookmark', route: '/students' },
    { title: 'Bedrijven', icon: 'business', route: '/companies' },
  ];

  isSelected!: boolean;

  constructor(
    private toastr: ToastrService,
    private syncService: SyncService,
    private router: Router,
    private dateShareService: DataShareService
  ) { }

  ngOnInit(): void { }

  synchronize() {
    this.dateShareService.data$.subscribe(data => { this.isSelected = data });
    this.syncGoogleSheet();
  }

  syncGoogleSheet() {
    this.isLoading = true;

    this.syncService.syncGoogleDriveFile(this.isSelected).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.toastr.success(result.message);
        this.router.navigate(['/proposals']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }

  navBarToggle() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChange.emit(this.isExpanded);
  }
}
