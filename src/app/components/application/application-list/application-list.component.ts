import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ApplicationService } from 'src/app/services/application.service';
import { MatTableDataSource } from '@angular/material/table';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  applications: Application[];
  displayedColumns: string[] = ['trip', 'createdAt', 'status', 'viewApplication'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private applicationService: ApplicationService,
              private translateService: TranslateService,
              private tripService: TripService) {
    super(translateService);
  }

  ngOnInit(): void {
    this.applicationService.getApplications()
      .then((data) => {
        if (data.length > 0) {
          this.applications = data;
          this.applications.forEach(async application => {
            await this.tripService.getTrip(application.idTrip)
              .then((trip) => {
                application.nameTrip = trip.title;
              })
              .catch((err) => console.error(err));
          });
          this.dataSource = new MatTableDataSource<Application>(this.applications);
          this.dataSource.paginator = this.paginator;
        }
      })
      .catch((err) => console.error(err.message));
  }

}
