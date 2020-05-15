import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/models/global-variables.model';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';

@Component({
  selector: 'app-global-variables',
  templateUrl: './global-variables.component.html',
  styleUrls: ['./global-variables.component.css']
})
export class GlobalVariablesComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {

  globalVarsForm: FormGroup;

  globalVars: GlobalVariables;

  private updated: boolean;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private globalVariablesService: GlobalVariablesService) {
    super(translateService);

    this.createForm();
  }

  createForm(): void {
    this.globalVarsForm = this.fb.group({
      flatRateSponsorships: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
      cacheTimeOutFinderResults: ['', [Validators.required, Validators.min(1), Validators.max(24), Validators.pattern('[0-9]+')]],
      maxNumberFinderResults: ['', [Validators.required, Validators.min(10), Validators.max(100), Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit(): void {
    this.updated = false;

    this.globalVariablesService.getGlobalVars()
      .then(data => {
        this.globalVars = data;
        this.globalVarsForm.get('flatRateSponsorships').setValue(this.globalVars.flatRateSponsorships);
        this.globalVarsForm.get('cacheTimeOutFinderResults').setValue(this.globalVars.cacheTimeOutFinderResults);
        this.globalVarsForm.get('maxNumberFinderResults').setValue(this.globalVars.maxNumberFinderResults);
      });
  }

  updateGlobalVars() {
    const globalVarsFromForm = {
      flatRateSponsorships: Number(this.globalVarsForm.get('flatRateSponsorships').value),
      cacheTimeOutFinderResults: Number(this.globalVarsForm.get('cacheTimeOutFinderResults').value),
      maxNumberFinderResults: Number(this.globalVarsForm.get('maxNumberFinderResults').value)
    };

    if (this.globalVars.flatRateSponsorships !== globalVarsFromForm.flatRateSponsorships) {
      this.globalVariablesService.updateFlatRateSponsorships(globalVarsFromForm.flatRateSponsorships)
        .then(_ => {
          this.updated = true;
          this.toastr.success(this.translateService.instant('messages.updated'));
          this.router.navigate(['global-variables']);
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (this.globalVars.cacheTimeOutFinderResults !== globalVarsFromForm.cacheTimeOutFinderResults) {
      this.globalVariablesService.updateCacheTimeOutFinderResults(globalVarsFromForm.cacheTimeOutFinderResults)
        .then(_ => {
          this.updated = true;
          this.toastr.success(this.translateService.instant('messages.updated'));
          this.router.navigate(['global-variables']);
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (this.globalVars.maxNumberFinderResults !== globalVarsFromForm.maxNumberFinderResults) {
      this.globalVariablesService.updateMaxNumberFinderResults(globalVarsFromForm.maxNumberFinderResults)
        .then(_ => {
          this.updated = true;
          this.toastr.success(this.translateService.instant('messages.updated'));
          this.router.navigate(['global-variables']);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.globalVarsForm.dirty) {
      result = confirm(message);
    }

    return result;
  }

}
