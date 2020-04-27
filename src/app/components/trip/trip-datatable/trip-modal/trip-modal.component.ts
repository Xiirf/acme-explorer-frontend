import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  idTrip: string;
  reason: string;
}

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.css']
})
export class TripModalComponent implements OnInit {

  reasonControl = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+.*'),
                                      Validators.minLength(10)]);
  constructor(
    public dialogRef: MatDialogRef<TripModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    console.log(this.data.reason);
  }

  ngOnInit(): void {
  }

}
