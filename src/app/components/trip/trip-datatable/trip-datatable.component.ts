import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { MatTableDataSource } from '@angular/material/table';
import { TripService } from 'src/app/services/trip.service';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TripModalComponent } from './trip-modal/trip-modal.component';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';

export interface DialogData {
  idTrip: string;
  reason: string;
}

@Component({
  selector: 'app-trip-datatable',
  templateUrl: './trip-datatable.component.html',
  styleUrls: ['./trip-datatable.component.css']
})
export class TripDatatableComponent implements OnInit {

  trips: Trip[];
  displayedColumns: string[] = ['pictures', 'ticker', 'title', 'price', 'description', 'start', 'end', 'cancelled', 'edit', 'cancel'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private tripService: TripService,
              private translateService: TranslateService,
              private router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService) {
    this.initialize();
  }

  initialize() {
    return this.tripService.getTripsManager()
    .then((data) => {
      this.trips = data;
      this.dataSource = new MatTableDataSource<Trip>(this.trips);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    .catch((error) => {console.log(error); });
  }

  onEdit(idTrip: string) {
    this.router.navigate(['/trips/update/' + idTrip]);
  }

  ngOnInit(): void {
  }

  cancelTrip(idTrip: string, start: Date) {
    if (moment(start.toString().slice(0, 10)).toDate() > moment(new Date(), 'DD/MM/YYYY').add(7, 'days').toDate()) {
      const dialogRef = this.dialog.open(TripModalComponent, {
        width: '250px',
        data: {idTrip, reason: ''}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.tripService.cancelTrip(result.idTrip, result.reason)
          .then(_ => {
            this.trips.find(trip => trip._id === result.idTrip).cancelled = true;
            this.toastr.success(this.translateService.instant('messages.trip.cancelled'));
          });
        }
      });
    } else {
      this.toastr.error(this.translateService.instant('errorMessages.to.late'));
    }
  }

}
