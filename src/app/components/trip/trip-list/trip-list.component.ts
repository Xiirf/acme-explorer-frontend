import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  private trips: Trip[];
  displayedColumns: string[] = ['pictures', 'ticker', 'title', 'price', 'description', 'start', 'end'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tripService: TripService) {
    tripService.getTrips()
      .then((data) => {
        this.trips = data;
        this.dataSource = new MatTableDataSource<Trip>(this.trips);
        this.dataSource.paginator = this.paginator;
      })
      .catch((error) => {console.log(error); });
  }

  ngOnInit(): void {
  }

}
