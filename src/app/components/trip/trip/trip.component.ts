import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ValidateDataEndIsLaterThanStart } from 'src/app/validator/validateDataEndIsLaterThanStart.validator';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;

  stageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private translateService: TranslateService) {
      super(translateService);
      this.createForm();
    }

  createForm(): void {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      pictures: ['', [Validators.required]],
      managerId: ['', [Validators.required]],
      price: ['', ]
    });
    // TODO stageform
  }

  ngOnInit(): void {
  }

}
