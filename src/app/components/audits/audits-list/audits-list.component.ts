import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Audit } from 'src/app/models/audit.model';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { AuditService } from 'src/app/services/audit.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-audits-list',
  templateUrl: './audits-list.component.html',
  styleUrls: ['./audits-list.component.css']
})
export class AuditsListComponent implements OnInit {

  audits: Audit[];
  displayedColumns: string[] = ['title', 'nameTrip', 'createdAt', 'description'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auditService: AuditService,
              private authService: AuthService,
              private tripService: TripService,
              private cdr: ChangeDetectorRef) {
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
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    .catch((error) => {console.log(error); });
  }

  ngOnInit(): void {
  }

}
