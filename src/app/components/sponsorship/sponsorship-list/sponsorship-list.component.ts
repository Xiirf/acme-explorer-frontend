import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { MatPaginator } from '@angular/material/paginator';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { TripService } from 'src/app/services/trip.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SponsorshipModalComponent } from './sponsorship-modal/sponsorship-modal.component';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { MatSort } from '@angular/material/sort';

export interface DialogData {
  idTrip: string;
  nameTrip: string;
}

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent extends TranslatableComponent implements OnInit {

  sponsorships: Sponsorship[];
  displayedColumns: string[] = ['banner', 'price', 'nameTrip', 'createdAt', 'link', 'payed', 'edit', 'cancel'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sponsorshipService: SponsorshipService,
              private authService: AuthService,
              private tripService: TripService,
              private router: Router,
              private translateService: TranslateService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
    super(translateService);
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
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    .catch((error) => {console.log(error); });
  }

  ngOnInit(): void {
  }

  onEdit(idSponsorship: string) {
    this.router.navigate(['/sponsorships/update/' + idSponsorship]);
  }

  cancelSponsorship(idSponsorship: string, nameTrip: string) {
    const dialogRef = this.dialog.open(SponsorshipModalComponent, {
      width: '400px',
      data: {idSponsorship, nameTrip}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.sponsorshipService.deleteSponsorship(result.idSponsorship).then(_ => {
          this.toastr.success(this.translateService.instant('messages.trip.cancelled'));
          this.router.navigate(['/sponsorships']);
        });
      }
    });
  }

}
