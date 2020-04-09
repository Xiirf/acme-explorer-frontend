import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

const MAX_STARS = 5;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  actor: Actor;
  trips: Trip[];
  displayedColumns: string[] = ['pictures', 'ticker', 'title', 'price', 'description', 'start', 'end'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tripService: TripService,
              private translateService: TranslateService,
              public authService: AuthService,
              private router: Router) {
    super(translateService);
  }

  ngOnInit(): void {
    this.tripService.getTrips()
      .then((val) => this.trips = val)
      .catch((err) => console.error(err.message));

    this.actor = this.authService.getCurrentActor();
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

}
