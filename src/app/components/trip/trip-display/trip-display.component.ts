import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';
import { AuditService } from 'src/app/services/audit.service';
import { Audit } from 'src/app/models/audit.model';
import { ActorService } from 'src/app/services/actor.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {

  private idTrip: string;
  trip: Trip;
  applications: Application[];
  audits: Audit[];
  faFile = faFile;

  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private translateService: TranslateService,
              private applicationService: ApplicationService,
              private auditService: AuditService,
              private actorService: ActorService,
              private router: Router) {
                super(translateService);
                this.audits = [];
                this.applications = [];
              }

  ngOnInit(): void {
    this.idTrip = this.route.snapshot.params.idTrip;
    this.tripService.getTrip(this.idTrip).then(trip => {
      this.trip = trip;
      this.applicationService.getApplicationByIdTrip(this.idTrip).then( applications => {
        for (const application of applications) {
            this.actorService.getActorById(application.idExplorer)
          .then((actor) => {
            application.nameExplo = actor.name + ' ' + actor.surname;
            this.applications.push(application);
          });
        }
        if (this.applications.length > 0) {
          this.applications.sort(this.sortByDate);​
        }
        this.auditService.getAuditByIdTrip(this.idTrip).then( audits => {
          for (const audit of audits) {
            this.actorService.getActorById(audit.idAuditor)
            .then((actor) => {
              audit.nameAuditor = actor.name + ' ' + actor.surname;
              this.audits.push(audit);
            });
          }
          if (this.audits.length > 0) {
            this.audits.sort(this.sortByDate);
          }
        });
      });
    });
  }

  sortByDate(a, b) {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA > dateB ? 1 : -1;
  }

  getStartComment(comment: string) {
    const commentSplit = comment.split(' ');
    let returnComment = '';
    if (commentSplit.length > 3) {
      for (let i = 0; i < 3; i++) {
        if (returnComment === '') {
          returnComment = commentSplit[i];
        } else {
          returnComment = returnComment + ' ' + commentSplit[i];
        }
      }
    } else {
      returnComment = comment;
    }
    return returnComment;
  }

  goback(): void {
    this.router.navigate(['/']);
  }

}
