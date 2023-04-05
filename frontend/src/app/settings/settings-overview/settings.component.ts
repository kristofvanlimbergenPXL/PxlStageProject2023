import { ToastrService } from 'ngx-toastr';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, finalize } from 'rxjs';
import { GoogleSheet } from 'src/app/models/googleSheet';
import { GetGoogleSheets } from '../settings.actions';
import { SettingsState } from '../settings.state';
import { Clipboard } from '@angular/cdk/clipboard';
import { SettingsService } from '../settings.service';
import { ExportService } from 'src/app/settings/export.service';
import { ImportService } from 'src/app/settings/import.service';
import { DataShareService } from '../../shared/services/data-share.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  private subscriptions = new Subscription();
  @Select(SettingsState.googleSheets)
  sheets$!: Observable<GoogleSheet[]>;
  sheets!: GoogleSheet[];
  selectedSheetId!: string;
  selectedSheetTitle!: string;
  selectedIndex!: number;
  isLoading: boolean = false;

  blackBoardLinks: string[] = new Array<string>();
  selectableDates: string[] = new Array<string>();
  selectedSchoolYear: string = '';

  select!: boolean;
  fileName!: any;
  isButtonDisabled: boolean = false;

  // import database
  @ViewChild('inputFile') myInputVariable!: ElementRef;
  file: any; // Variable to store file to Upload

  private token: any;

  constructor(
    private store: Store,
    private _ngZone: NgZone,
    private router: Router,
    private service: ExportService,
    private import_service: ImportService,
    private clipboard: Clipboard,
    private toastr: ToastrService,
    private settingService: SettingsService,
    private dataShareService: DataShareService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.select = false;

    this.subscriptions.add(
      this.sheets$.subscribe((sheets) => {
        if (!sheets || sheets.length == 0) {
          this.store.dispatch(new GetGoogleSheets(this.token)).subscribe({
            next: (res) => {
              (this.sheets = sheets), this.setSheetInfo();
            },
            error: (error: any) => {
              if (error.status == 401 || error.status == 403) {
                this.toastr.error('Unauthorized');
              }
            },
          });
        } else {
          this.sheets = sheets;
          this.setSheetInfo();
        }
      })
    );

    this.selectableDates = this.calculateSelectableDates();
    this.selectedSchoolYear = this.selectableDates[2];
    this.selectedSchoolYearChanged();
  }

  setSheetInfo() {
    if (localStorage.getItem('selectedSheetId') != null) {
      this.selectedIndex = this.sheets.findIndex(
        (x) => x.id === localStorage.getItem('selectedSheetId')
      );
    }

    if (this.sheets && this.sheets.length > 0) {
      this.selectFile(this.selectedIndex);
    }

    this.fileName = this.selectedSheetTitle as string;
  }

  selectFile(selected: number = 0) {
    const selectedIndex =
      document.querySelector('select')!.selectedIndex >= 0
        ? document.querySelector('select')!.selectedIndex
        : selected;

    localStorage.setItem('selectedSheetId', this.sheets[selectedIndex]?.id);
    this.selectedSheetId = this.sheets[selectedIndex]?.id;

    localStorage.setItem(
      'selectedSheetTitle',
      this.sheets[selectedIndex]?.name
    );
    this.selectedSheetTitle = this.sheets[selectedIndex]?.name.substring(
      0,
      this.sheets[selectedIndex]?.name.indexOf('.')
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onChange(event: any) {
    this.file = event?.target?.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.sendFile(this.file);
    //resets the file input field after sending file to backend
    this.myInputVariable.nativeElement.value = '';
  }

  sendFile(file: any) {
    this.isLoading = true;
    let formData = new FormData();
    formData.append('dbFile', file);
    this.import_service.uploadFile(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Database succesvol geïmporteerd');
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }

  copyLink(link: string) {
    this.clipboard.copy(link);
  }

  dragDropSorting(): void {
    this.router.navigate(['/students/csv/sort']);
  }

  export() {
    //openen config dialog met message
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Gelieve te bevestigen',
          question:
            'Als je verder gaat wordt er een export van de database gedaan en vervolgens leeg gemaakt.<br><br><strong>Ben je zeker?</strong>',
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          //als op Ok is gedrukt --> export + flush --> geen extra controles meer
          this.select = true;
          this.dataShareService.setData(this.select);

          //button even disable voor 10 sec
          this.isButtonDisabled = true;
          setTimeout(() => {
            this.isButtonDisabled = false;
          }, 10000);

          //export
          this.exportFile(this.fileName);
          //flush logica is nog hetzelfde als daarvoor
        }
      });
  }

  exportFile(selectedSheetTitle: string): void {
    this.isLoading = true;
    this.service.getExportDbFile().subscribe({
      next: (response) => {
        let a = document.createElement('a');
        let blob: Blob = response.body as Blob;
        a.href = window.URL.createObjectURL(blob);
        a.download = `${selectedSheetTitle}.db`;
        a.click();
        this.isLoading = false;
        this.toastr.success('Database kan succesvol geëxporteerd worden.');
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }
  downloadFile() {
    this.isLoading = true;
    this.service.getExportDbFile().subscribe({
      next: (response) => {
        let a = document.createElement('a');
        let blob: Blob = response.body as Blob;
        a.href = window.URL.createObjectURL(blob);
        a.download = `${this.selectedSheetTitle}.db`;
        a.click();
        this.isLoading = false;
        this.toastr.success('Database kan succesvol geëxporteerd worden.');
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }

  calculateSelectableDates(): Array<string> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const formatYear = (year: number) =>
      `${year}-${(year + 1).toString().slice(-2)}`;

    const dates = [
      new Date(currentYear - 2, currentDate.getMonth(), currentDate.getDate()),
      new Date(currentYear - 1, currentDate.getMonth(), currentDate.getDate()),
      currentDate, // current date
      new Date(currentYear + 1, currentDate.getMonth(), currentDate.getDate()),
      new Date(currentYear + 2, currentDate.getMonth(), currentDate.getDate()),
    ].map((date) => formatYear(date.getFullYear()));

    return dates;
  }

  selectedSchoolYearChanged() {}

  onGenerateBlackBoardLinksClick() {
    if (!this.selectedSchoolYear) return;
    this.isLoading = true;
    this.settingService
      .generateBlackBoardLinks(this.selectedSchoolYear)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res.length !== 2) {
            this.toastr.error(
              'Blackboard links konden niet gegenereerd worden'
            );
          }
          this.blackBoardLinks = res;
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }
}
