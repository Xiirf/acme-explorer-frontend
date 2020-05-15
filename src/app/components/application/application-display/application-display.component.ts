import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/services/application.service';
import { TripService } from 'src/app/services/trip.service';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.css']
})
export class ApplicationDisplayComponent extends TranslatableComponent implements OnInit {

  private idApplication: string;
  application: Application;
  currentActor: Actor;
  activeRole: string;
  backgroundColor: string;

  constructor(private route: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              private applicationService: ApplicationService,
              private authService: AuthService,
              private tripService: TripService) {
    super(translateService);
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor.role.toString();
    }
  }

  ngOnInit(): void {
    this.idApplication = this.route.snapshot.params.idApplication;
    this.applicationService.getApplication(this.idApplication)
      .then((data) => {
        this.application = data;
        this.tripService.getTrip(this.application.idTrip)
          .then((trip) => {
            this.application.nameTrip = trip.title;
            switch (this.application.status) {
              case 'PENDING':
                const now = new Date();
                now.setMonth(now.getMonth() + 1);
                if (now > trip.start) {
                  this.backgroundColor = 'text-danger bg-secondary mb-3';
                } else {
                  this.backgroundColor = '';
                }
                break;
              case 'REJECTED':
                this.backgroundColor = 'text-white bg-secondary mb-3';
                break;
              case 'DUE':
                this.backgroundColor = 'text-white bg-warning mb-3';
                break;
              case 'ACCEPTED':
                this.backgroundColor = 'text-white bg-success mb-3';
                break;
              case 'CANCELLED':
                this.backgroundColor = 'text-white bg-info mb-3';
                break;
              default:
                this.backgroundColor = '';
                break;
            }
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));
  }

  goback(): void {
    this.router.navigate(['/']);
  }

}
