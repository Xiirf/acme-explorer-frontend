import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';
import { Audit } from 'src/app/models/audit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripService } from 'src/app/services/trip.service';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-audits-display',
  templateUrl: './audits-display.component.html',
  styleUrls: ['./audits-display.component.css']
})
export class AuditsDisplayComponent extends TranslatableComponent implements OnInit {

  private idAudit: string;
  audit: Audit;

  constructor(private route: ActivatedRoute,
              private auditService: AuditService,
              private tripService: TripService,
              private actorService: ActorService,
              private translateService: TranslateService,
              private router: Router) {
                super(translateService);
  }

  ngOnInit(): void {
    this.idAudit = this.route.snapshot.params.idAudit;
    this.auditService.getAuditByIdAudit(this.idAudit).then(audit => {
      this.tripService.getTrip(audit.idTrip)
      .then((trip) => {
        audit.nameTrip = trip.title;
        this.actorService.getActorById(audit.idAuditor)
        .then((actor) => {
          audit.nameAuditor = actor.name + ' ' + actor.surname;
          this.audit = audit;
        })
        .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    });
  }

}
