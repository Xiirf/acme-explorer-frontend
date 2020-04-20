import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;

  stageForm: FormGroup;

  minDateStart: Date;
  minDateEnd: Date;

  requirementsList: FormArray;
  stagesList: FormArray;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService) {
      super(translateService);
      this.minDateStart = moment().add(7, 'days').toDate();
      this.minDateEnd = this.minDateStart;
      this.createForm();
    }

  createForm(): void {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      requirements: this.fb.array([this.createRequirement()]),
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      stages: this.fb.array([this.createStage()])
    });
    this.requirementsList = this.tripForm.get('requirements') as FormArray;
    this.stagesList = this.tripForm.get('stages') as FormArray;
    // TODO stage + pictures
    
  }

  createTrip() {
    // TODO dans al création du trip ajouter l'id manager
    // Attention date et langue utilisé (remmetre en fr) puis créer date

    console.log("Create?");
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
