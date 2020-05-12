import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {

  applicationForm: FormGroup;
  commentsList: FormArray;
  application: Application;
  currentActor: Actor;
  activeRole: string;

  private updated: boolean;

  constructor(private fb: FormBuilder,
              private translateService: TranslateService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private applicationService: ApplicationService) {
    super(translateService);

    this.createForm();

    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor.role.toString();
    }

    if (this.route.snapshot.params.idApplication) {
      this.applicationService.getApplication(this.route.snapshot.params.idApplication).then(application => {
        this.application = application;
        this.applicationForm.get('status').setValue(application.status);
        for (let i = 0; i < this.application.comments.length; i++) {
          if (i > 0) {
            this.addComment();
          }
          this.commentsList.controls[i].get('comment').setValue(application.comments[i]);
        }
      });
    }
  }

  ngOnInit(): void {
    this.updated = false;
  }

  createForm(): void {
    this.applicationForm = this.fb.group({
      status: [''],
      comments: this.fb.array([this.createApplication()])
    });
    this.commentsList = this.applicationForm.get('comments') as FormArray;
  }

  createApplication(): FormGroup {
    return this.fb.group({
      comment: ['', [Validators.required]]
    });
  }

  addComment() {
    this.commentsList.push(this.createApplication());
  }

  removeComment(index: number) {
    this.commentsList.removeAt(index);
  }

  createOrUpdateApplication() {
    const comments = [];
    for (const c of this.commentsList.controls) {
      comments.push(c.get('comment').value);
    }

    if (this.application) {
      this.application.comments = comments;
      if (this.applicationForm.value.status) {
        this.application.status = this.applicationForm.value.status;
      }
      this.applicationService.updateApplication(this.application, this.application._id)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.applicationUpdated'));
        this.router.navigate(['/applications/update/' + this.application._id]);
      })
      .catch(error => {
        this.applicationForm.reset();
        console.log(error);
      });
    } else {
      const applicationFromForm = {
        idTrip: this.route.snapshot.params.idTrip,
        comments
      }
      this.applicationService.createApplication(applicationFromForm)
      .then(_ => {
        this.updated = true;
        this.toastr.success(this.translateService.instant('messages.tripCreated'));
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.applicationForm.reset();
        console.log(error);
      });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.applicationForm.dirty) {
      result = confirm(message);
    }

    return result;
  }
}
