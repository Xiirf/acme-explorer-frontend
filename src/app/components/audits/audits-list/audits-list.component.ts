import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Audit } from 'src/app/models/audit.model';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-audits-list',
  templateUrl: './audits-list.component.html',
  styleUrls: ['./audits-list.component.css']
})
export class AuditsListComponent implements OnInit {

  audits: Audit[];
  displayedColumns: string[] = ['title', 'nameTrip', 'createdAt', 'description'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private auditService: AuditService,
              private authService: AuthService,
              private tripService: TripService) {
    this.initialize();
  }

  async initialize() {
    return this.auditService.getAuditByIdAuditor(this.authService.getCurrentActor()._id)
    .then((data) => {
      if (data.length > 0) {
        this.audits = data;
        this.audits.forEach(async audit => {
          await this.tripService.getTrip(audit.idTrip)
            .then((trip) => {
              audit.nameTrip = trip.title;
            })
            .catch((err) => console.error(err));
        });
        this.dataSource = new MatTableDataSource<Audit>(this.audits);
        this.dataSource.paginator = this.paginator;
      }
    })
    .catch((error) => {console.log(error); });
  }

  ngOnInit(): void {
  }

}
