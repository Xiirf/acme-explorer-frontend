import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FinderService } from 'src/app/services/finder.service';
import { AuthService } from 'src/app/services/auth.service';
import { Finder } from 'src/app/models/finder.model';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { CrossValidation } from 'src/app/validator/crossValidation.validator';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent extends TranslatableComponent implements OnInit {
  finderForm: FormGroup;
  finder: Finder;
  minDate: Date;
  trips: Trip[];
  loading: boolean;
  search: boolean;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private finderService: FinderService,
    private authService: AuthService,
    private tripService: TripService) {
    super(translateService);
    this.minDate = new Date();
    this.search = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.finderForm = this.fb.group({
      _id: [''],
      idExplorer: [''],
      keyWord: ['', Validators.maxLength(20)],
      priceMin: ['', Validators.pattern('[0-9]+')],
      priceMax: ['', Validators.pattern('[0-9]+')],
      dateMin: [''],
      dateMax: [''],
    }, { validators: CrossValidation });

    const idExplorer = this.authService.getCurrentActor()._id;
    this.finderService.getFinderByExplorerId(idExplorer)
      .then(finder => {
        this.finder = finder;

        if (finder) {
          this.finderForm.controls._id.setValue(finder._id);
          this.finderForm.controls.idExplorer.setValue(finder.idExplorer);
          this.finderForm.controls.keyWord.setValue(finder.keyWord);
          this.finderForm.controls.priceMin.setValue(finder.priceMin);
          this.finderForm.controls.priceMax.setValue(finder.priceMax);
          this.finderForm.controls.dateMin.setValue(finder.dateMin);
          this.finderForm.controls.dateMax.setValue(finder.dateMax);
        }

        const trips = localStorage.getItem('tripsFinder');
        if (trips) {
          this.trips = JSON.parse(trips);
        }
      })
      .catch(err => {
        if (err !== 'Not Found') {
          console.error(err);
        }
      });
  }

  submitForm(): void {
    this.search = true;
    const formModel = this.finderForm.value;

    if (this.finder) {
      this.finderService.updateFinder(formModel)
        .catch(err => console.error(err));
    } else {
      formModel.idExplorer = this.authService.getCurrentActor()._id;
      formModel._id = null;
      this.finderService.createFinder(formModel)
        .catch(err => console.error(err));
    }

    this.loading = true;
    this.tripService.getTripsWithFinder(formModel)
      .then(trips => {
        this.loading = false;
        this.trips = trips;
        localStorage.setItem('tripsFinder', JSON.stringify(trips));
      })
      .catch(err => console.error(err));
  }
}
