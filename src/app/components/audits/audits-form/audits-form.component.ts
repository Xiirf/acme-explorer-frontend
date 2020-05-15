import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Audit } from 'src/app/models/audit.model';
import { TranslateService } from '@ngx-translate/core';
import { AuditService } from 'src/app/services/audit.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ValidateUrlOptional } from 'src/app/validator/optionalUrl.validator';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-audits-form',
  templateUrl: './audits-form.component.html',
  styleUrls: ['./audits-form.component.css']
})
export class AuditsFormComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {

  auditForm: FormGroup;

  audit: Audit;
  optionalAttachmentsList: FormArray;
  trips: Trip[];
  private updated: boolean;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private auditService: AuditService,
    private authService: AuthService,
    private tripService: TripService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe) {
      super(translateService);
      this.createForm();
    }

  createForm(): void {
    this.auditForm = this.fb.group({
      idTrip: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      optionalAttachments: this.fb.array([this.createoptionalAttachment()])
    });
    this.optionalAttachmentsList = this.auditForm.get('optionalAttachments') as FormArray;
    this.tripService.getTrips()
    .then(data => {
      this.trips = data;
    });
  }

  createAudit() {
    const optionalAttachments = [];
    for (const oA of this.optionalAttachmentsList.controls) {
      if (oA.get('optionalAttachment').value !== '') {
        optionalAttachments.push(oA.get('optionalAttachment').value);
      }
    }
    const idAuditor = this.authService.getCurrentActor()._id;
    const auditFromForm = {
      idAuditor,
      idTrip: this.auditForm.get('idTrip').value,
      title: this.auditForm.get('title').value,
      description: this.auditForm.get('description').value,
      optionalAttachments
    };

    this.auditService.createAudit(auditFromForm)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.auditCreated'));
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.auditForm.reset();
        console.log(error);
      });
  }

  createoptionalAttachment(): FormGroup {
    return this.fb.group({
      optionalAttachment: ['', [ValidateUrlOptional]]
    });
  }

  addObject() {
    this.optionalAttachmentsList.push(this.createoptionalAttachment());
  }

  removeObject(index: number) {
    this.optionalAttachmentsList.removeAt(index);
  }

  ngOnInit(): void {
    this.updated = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.auditForm.dirty) {
      result = confirm(message);
    }

    return result;
  }

}
