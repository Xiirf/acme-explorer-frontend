import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

const MAX_STARS = 5;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];

  constructor(public tripService: TripService,
              private translateService: TranslateService,
              private router: Router) {
    super(translateService);
    this.initialize();
  }

  initialize() {
    return this.tripService.getTrips()
      .then((val) => this.trips = val)
      .catch((err) => console.error(err.message));
  }

  ngOnInit(): void {
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

}
