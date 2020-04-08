import { Component, OnInit, ViewChild } from '@angular/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { MatPaginator } from '@angular/material/paginator';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent implements OnInit {

  sponsorships: Sponsorship[];
  displayedColumns: string[] = ['banner', 'price', 'nameTrip', 'createdAt', 'link'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private sponsorshipService: SponsorshipService,
              private authService: AuthService,
              private tripService: TripService) {
    this.initialize();
  }

  async initialize() {
    return this.sponsorshipService.getSponsorshipsByIdSponsor(this.authService.getCurrentActor()._id)
    .then((data) => {
      if (data.length > 0) {
        this.sponsorships = data;
        this.sponsorships.forEach(async sponsorship => {
          await this.tripService.getTrip(sponsorship.trip_id)
            .then((trip) => {
              sponsorship.nameTrip = trip.title;
            })
            .catch((err) => console.error(err));
        });
        this.dataSource = new MatTableDataSource<Sponsorship>(this.sponsorships);
        this.dataSource.paginator = this.paginator;
      }
    })
    .catch((error) => {console.log(error); });
  }

  ngOnInit(): void {
  }

}
