import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  title!: string;
  question!: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title ?? '';
    this.question = this.data.question ?? '';
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
