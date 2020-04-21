import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateUrlOptional } from 'src/app/validator/optionalUrl.validator';
import { TripService } from 'src/app/services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;

  minDateStart: Date;
  minDateEnd: Date;

  requirementsList: FormArray;
  stagesList: FormArray;

  trip: Trip;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private authService: AuthService,
    private tripService: TripService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe) {
      super(translateService);
      this.minDateStart = moment().add(7, 'days').toDate();
      this.minDateEnd = this.minDateStart;
      this.createForm();

      if (this.route.snapshot.params.idTrip) {
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
          this.tripForm.get('start').setValue(moment(this.trip.start.toString().slice(0, 10)).toDate());
          this.minDateEnd = trip.start;
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
        });
      }
    }

  createForm(): void {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      requirements: this.fb.array([this.createRequirement()]),
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      stages: this.fb.array([this.createStage()]),
      picture: ['', ValidateUrlOptional],
    });
    this.requirementsList = this.tripForm.get('requirements') as FormArray;
    this.stagesList = this.tripForm.get('stages') as FormArray;
  }

  createOrUpdateTrip() {
    const requirements = [];
    for (const req of this.requirementsList.controls) {
      requirements.push(req.get('requirement').value);
    }
    const stages = [];
    for (const stage of this.stagesList.controls) {
      stages.push({
        title: stage.get('title').value,
        description: stage.get('description').value,
        price: stage.get('price').value
      });
    }
    const pictures = [];
    pictures.push(this.tripForm.get('picture').value);
    const tripFromForm = {
      title: this.tripForm.get('title').value,
      description: this.tripForm.get('description').value,
      requirements,
      start: moment(this.tripForm.get('start').value, 'DD/MM/YYYY').toDate(),
      end: moment(this.tripForm.get('end').value, 'DD/MM/YYYY').toDate(),
      stages,
      pictures
    };

    if (this.trip) {
      this.tripService.updateTrip(tripFromForm, this.trip._id)
      .then(_ => {
        this.toastr.success(this.translateService.instant('messages.tripUpdated'));
        this.router.navigate(['/trips/update/' + this.trip._id]);
      })
      .catch(error => {
        this.tripForm.reset();
        console.log(error);
      });
    } else {
      this.tripService.createTrip(tripFromForm)
      .then(_ => {
        this.toastr.success(this.translateService.instant('messages.tripCreated'));
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.tripForm.reset();
        console.log(error);
      });
    }
  }

  createRequirement(): FormGroup {
    return this.fb.group({
      requirement: ['', [Validators.required]]
    });
  }

  createStage(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  addObject(list: string) {
    if (list === 'requirements') {
      this.requirementsList.push(this.createRequirement());
    } else if (list === 'stages') {
      this.stagesList.push(this.createStage());
    }
  }

  removeObject(list: string, index: number) {
    if (list === 'requirements') {
      this.requirementsList.removeAt(index);
    } else if (list === 'stages') {
      this.stagesList.removeAt(index);
    }
  }

  ngOnInit(): void {
  }

  onChangeDate(event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = new Date(event.value);
    if (newDate > this.minDateStart) {
      this.minDateEnd = newDate;
    }
  }

}
