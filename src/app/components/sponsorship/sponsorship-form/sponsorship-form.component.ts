import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip.model';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidateUrlOptional } from 'src/app/validator/optionalUrl.validator';
import { Observable } from 'rxjs';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';

@Component({
  selector: 'app-sponsorship-form',
  templateUrl: './sponsorship-form.component.html',
  styleUrls: ['./sponsorship-form.component.css']
})
export class SponsorshipFormComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {

  sponsorshipForm: FormGroup;

  minDateStart: Date;
  minDateEnd: Date;

  trip: Trip;
  trips: Trip[];

  sponsorship: Sponsorship;

  private updated: boolean;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private sponsorshipService: SponsorshipService,
    private tripService: TripService) {
      super(translateService);
      this.createForm();

      if (this.route.snapshot.params.idSponsorship) {
        this.sponsorshipService.getSponsorship(this.route.snapshot.params.idSponsorship)
        .then(sponsorship => {
          if (sponsorship.sponsor_id === this.authService.getCurrentActor()._id) {
            this.sponsorship = sponsorship;
            this.sponsorshipForm.get('idTrip').setValue(this.sponsorship.trip_id);
            this.sponsorshipForm.get('banner').setValue(this.sponsorship.banner[0]);
            this.sponsorshipForm.get('link').setValue(this.sponsorship.link);
          } else {
            this.router.navigate(['denied-access'], { queryParams: { previousURL: this.router.url}});
          }
        });
      }
    }

  createForm(): void {
    this.sponsorshipForm = this.fb.group({
      idTrip: ['', [Validators.required]],
      banner: ['', [Validators.required, ValidateUrlOptional]],
      link: ['', [Validators.required, ValidateUrlOptional]]
    });
    this.tripService.getTrips()
    .then(data => {
      this.trips = data;
    });
  }

  createOrUpdateSponsorship() {
    const SponsorshipFromForm = {
      banner: [this.sponsorshipForm.get('banner').value],
      link: this.sponsorshipForm.get('link').value,
      trip_id: this.sponsorshipForm.get('idTrip').value,
    };

    if (this.sponsorship) {
      this.sponsorshipService.updateSponsorship(SponsorshipFromForm, this.sponsorship._id)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.sponsorshipUpdated'));
        this.router.navigate(['/sponsorships']);
      })
      .catch(error => {
        this.sponsorshipForm.reset();
        console.log(error);
      });
    } else {
      this.sponsorshipService.createSponsorship(SponsorshipFromForm)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.sponsorshipCreated'));
        this.router.navigate(['/sponsorships']);
      })
      .catch(error => {
        this.sponsorshipForm.reset();
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
    this.updated = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.sponsorshipForm.dirty) {
      result = confirm(message);
    }

    return result;
  }

}
