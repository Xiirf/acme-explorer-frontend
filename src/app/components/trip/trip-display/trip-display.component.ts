import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {

  private idTrip: string;
  trip: Trip;

  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private translateService: TranslateService,
              private router: Router) {
                super(translateService);
  }

  ngOnInit(): void {
    this.idTrip = this.route.snapshot.params.idTrip;
    this.tripService.getTrip(this.idTrip).then(trip => {
      this.trip = trip;
    });
  }

  goback(): void {
    this.router.navigate(['/']);
  }

}
