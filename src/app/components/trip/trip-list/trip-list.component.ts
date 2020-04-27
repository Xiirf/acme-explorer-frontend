import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

const MAX_TRIPS = 5;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];
  numObjects = MAX_TRIPS;

  keyword: string;

  constructor(public tripService: TripService,
              private translateService: TranslateService,
              private router: Router,
              private storageService: StorageService) {
    super(translateService);
    if (localStorage.getItem('keyword')) {
      this.keyword = localStorage.getItem('keyword');
      localStorage.removeItem('keyword');
      this.tripService.searchTrip(0, MAX_TRIPS, this.keyword)
      .then((val) => this.trips = val)
      .catch((err) => console.error(err.message));
    } else {
      this.tripService.getTripsPage(0, MAX_TRIPS)
      .then((val) => this.trips = val)
      .catch((err) => console.error(err.message));
    }
  }

  ngOnInit(): void {
    this.storageService.watchKeyWord().subscribe((keyword) => {
      console.log('ICI');
      this.keyword = keyword;
      this.numObjects = MAX_TRIPS;
      if (this.keyword !== '') {
        this.tripService.searchTrip(0, MAX_TRIPS, this.keyword)
        .then((val) => this.trips = val)
        .catch((err) => console.error(err.message));
      } else {
        this.keyword = null;
        this.tripService.getTripsPage(0, MAX_TRIPS)
        .then((val) => this.trips = val)
        .catch((err) => console.error(err.message));
      }
    });
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

  async onScrollDown() {
    const start = this.numObjects;
    this.numObjects += MAX_TRIPS;
    this.addTrips(start);
  }

  async onScrollUp() {
    const start = this.numObjects;
    this.numObjects += MAX_TRIPS;
    this.addTrips(start);
  }

  async addTrips(startIndex) {
    if (this.keyword) {
      this.tripService.searchTrip(startIndex, MAX_TRIPS, this.keyword)
      .then((val) => this.trips = this.trips.concat(val))
      .catch((err) => console.error(err.message));
    } else {
      this.tripService.getTripsPage(startIndex, MAX_TRIPS)
      .then((val) => this.trips = this.trips.concat(val))
      .catch((err) => console.error(err));
    }
  }
}
