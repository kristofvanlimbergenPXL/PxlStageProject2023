import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/students/student.service';
import { Router } from '@angular/router';
import { StudentCsv } from 'src/app/models/studentCsv';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  filterInput: FormControl = new FormControl();
  ExcelData!: any;
  actualCsvPropertyOrder!: StudentCsv;
  proposalUrl!: string;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  isLoading: boolean = false;

  filterValues: any = {
    searchText: '',
  };

  displayedColumns: string[] = [
    'name',
    'studentAddress',
    'email',
    'phoneNumber',
    'stagevoorstel',
    'modelTraject',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.studentService.getStudents().subscribe({
      next: (res) => {
        let mappedResult = res.map((e) => ({
          ...e,
        }));
        this.dataSource = new MatTableDataSource<Student>(mappedResult);
        this.dataSource.paginator = this.paginator;
        this.filterInput.valueChanges
          .pipe(debounceTime(200))
          .subscribe((val) => {
            this.filterValues.searchText = val.trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filterValues);
          });
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          let filterTerms = JSON.parse(filter);
          return (
            data.firstName
              .trim()
              .toLowerCase()
              .indexOf(filterTerms.searchText) !== -1 ||
            data.lastName
              .trim()
              .toLowerCase()
              .indexOf(filterTerms.searchText) !== -1
          );
        };
      },
    });
  }

  getActualCsvOrder() {
    this.studentService.getActualStudentCsv().subscribe((data) => {
      this.actualCsvPropertyOrder = data;
    });
  }

  openFile() {
    document.getElementById('import')!.click();
  }

  importStudents(event: any) {
    this.isLoading = true;
    if (event.target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);

    this.studentService.getStudentsFromCsv(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Studenten succesvol ingeladen vanuit CSV-file.');
        this.loadData();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }

  addStudent(): void {
    this.router.navigate(['/students/add']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row: Student) {
    this.router.navigate(['/students', row.id]);
  }

  onProposalClick(event: any, id: number) {
    event.stopPropagation();
    this.router.navigate([`/proposals/detail/${id}`]);
  }
}
