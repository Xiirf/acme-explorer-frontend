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
        // TODO vérifier si id actor = actor actuel
        /*
        this.tripService.getTrip(this.route.snapshot.params.idTrip).then(trip => {
          this.trip = trip;
          this.tripForm.get('title').setValue(trip.title);
          this.tripForm.get('description').setValue(trip.description);
          for (let i = 0; i < this.trip.requirements.length; i++) {
            if (i > 0) {
              this.addObject('requirements');
            }
            this.requirementsList.controls[i].get('requirement').setValue(trip.requirements[i]);
          }
          this.tripForm.get('start').markAsTouched();
          this.tripForm.get('start').setValue(moment(this.trip.start.toString().slice(0, 10)).toDate());
          this.minDateEnd = trip.start;
          this.tripForm.get('end').markAsTouched();
          this.tripForm.get('end').setValue(moment(this.trip.end.toString().slice(0, 10)).toDate());
          for (let i = 0; i < this.stagesList.controls.length; i++) {
            if (i > 0) {
              this.addObject('stages');
            }
            this.stagesList.controls[i].get('title').setValue(trip.stages[i].title);
            this.stagesList.controls[i].get('description').setValue(trip.stages[i].description);
            this.stagesList.controls[i].get('price').setValue(trip.stages[i].price);
          }
          this.tripForm.get('picture').setValue(trip.pictures[0]);
        });*/
      }
    }

  createForm(): void {
    this.sponsorshipForm = this.fb.group({
      idTrip: ['', [Validators.required]],
      banner: ['', [Validators.required, ValidateUrlOptional]],
      link: ['', [Validators.required, ValidateUrlOptional]],
      price: ['', [Validators.required]]
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
      price: this.sponsorshipForm.get('price').value,
      trip_id: this.sponsorshipForm.get('idTrip').value,
    };

    if (this.sponsorship) {
      /*this.tripService.updateTrip(tripFromForm, this.trip._id)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.tripUpdated'));
        this.router.navigate(['/trips/update/' + this.trip._id]);
      })
      .catch(error => {
        this.tripForm.reset();
        console.log(error);
      });*/
    } else {
      this.sponsorshipService.createSponsorship(SponsorshipFromForm)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.sponsorshipCreated'));
        this.router.navigate(['/']);
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
