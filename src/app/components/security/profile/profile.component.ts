import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {
  profileForm: FormGroup;
  private updated: boolean;
  matcher = new MyErrorStateMatcher();
  actor: Actor;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private actorService: ActorService,
    private router: Router) {
    super(translateService);
  }

  ngOnInit(): void {
    this.updated = false;
    this.createForm();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      password: ['', [Validators.minLength(8), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      role: ['']
    });

    const idActor = this.authService.getCurrentActor()._id;
    this.actorService.getActorById(idActor).then((actor) => {
      this.actor = actor;

      if (actor) {
        this.profileForm.controls._id.setValue(actor._id);
        this.profileForm.controls.name.setValue(actor.name);
        this.profileForm.controls.surname.setValue(actor.surname);
        this.profileForm.controls.phone.setValue(actor.phone);
        this.profileForm.controls.password.setValue(actor.password);
        this.profileForm.controls.email.setValue(actor.email);
        this.profileForm.controls.address.setValue(actor.address);
        this.profileForm.controls.role.setValue(actor.role);
      }
    });
  }

  onUpdateProfile(): void {
    const formModel = this.profileForm.value;

    this.authService.updateProfile(formModel)
      .then((val) => {
        this.toastr.success(this.translateService.instant('message.profileUpdated'));
        this.profileForm.reset();
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.profileForm.dirty) {
      result = confirm(message);
    }

    return result;
  }

}
