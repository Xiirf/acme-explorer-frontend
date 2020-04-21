import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { MatTableDataSource } from '@angular/material/table';
import { TripService } from 'src/app/services/trip.service';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-datatable',
  templateUrl: './trip-datatable.component.html',
  styleUrls: ['./trip-datatable.component.css']
})
export class TripDatatableComponent implements OnInit {

  trips: Trip[];
  displayedColumns: string[] = ['pictures', 'ticker', 'title', 'price', 'description', 'start', 'end', 'edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tripService: TripService,
              private translateService: TranslateService,
              private router: Router) {
    this.initialize();
  }

  initialize() {
    return this.tripService.getTripsManager()
    .then((data) => {
      this.trips = data;
      this.dataSource = new MatTableDataSource<Trip>(this.trips);
      this.dataSource.paginator = this.paginator;
    })
    .catch((error) => {console.log(error); });
  }

  onEdit(idTrip: string) {
    this.router.navigate(['/trips/update/' + idTrip]);
  }

  onDelete(idTrip: string) {
    
  }

  ngOnInit(): void {
  }

}
