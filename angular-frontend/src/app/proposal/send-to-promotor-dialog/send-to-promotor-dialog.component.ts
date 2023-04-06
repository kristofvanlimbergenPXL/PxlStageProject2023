import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-to-promotor-dialog',
  templateUrl: './send-to-promotor-dialog.component.html',
  styleUrls: ['./send-to-promotor-dialog.component.scss'],
})
export class SendToPromotorDialogComponent implements OnInit {
  emailForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<SendToPromotorDialogComponent>) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      sendAttachment: new FormControl(false),
    });
  }

  onCancelClick(): void {
    this.dialogRef.close({ action: 'Cancel' });
  }

  onSubmit() {
    if (!this.emailForm.valid) return;
    console.log(this.emailForm.value.sendAttachment);
    this.dialogRef.close({
      action: 'Send',
      title: this.emailForm.value.title,
      content: this.emailForm.value.content,
      sendAttachment: this.emailForm.value.sendAttachment,
    });
  }
}
