import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  idTrip: string;
  nameTrip: string;
}

@Component({
  selector: 'app-sponsorship-modal',
  templateUrl: './sponsorship-modal.component.html',
  styleUrls: ['./sponsorship-modal.component.css']
})
export class SponsorshipModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SponsorshipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
