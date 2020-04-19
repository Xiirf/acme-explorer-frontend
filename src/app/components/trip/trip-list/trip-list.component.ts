import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

const MAX_TRIPS = 5;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];
  numObjects = MAX_TRIPS;

  constructor(private tripService: TripService,
              private translateService: TranslateService,
              private router: Router) {
    super(translateService);
  }

  ngOnInit(): void {
    this.tripService.getTripsPage(0, MAX_TRIPS)
      .then((val) => this.trips = val)
      .catch((err) => console.error(err.message));
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

  onScrollDown() {
    const start = this.numObjects;
    this.numObjects += MAX_TRIPS;
    this.addTrips(start);
  }

  onScrollUp() {
    const start = this.numObjects;
    this.numObjects += MAX_TRIPS;
    this.addTrips(start);
  }

  addTrips(startIndex) {
    this.tripService.getTripsPage(startIndex, MAX_TRIPS)
      .then((val) => this.trips = this.trips.concat(val))
      .catch((err) => console.error(err));
  }
}
