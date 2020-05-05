import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from 'src/app/services/storage.service';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { Observable } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {
  registerForm: FormGroup;
  private updated: boolean;

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private fireAuth: AngularFireAuth,
    private storageService: StorageService
  ) {
    super(translateService);
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      role: ['Explorer']
    });
  }

  ngOnInit(): void {
    this.updated = false;
  }

  onRegister(): void {
    this.authService.register(this.registerForm.value)
      .then(_ => {
        this.fireAuth.auth.currentUser.getIdToken()
          .then((token: string) => {
            this.updated = true;
            this.storageService.setItem('token', token);
            this.toastr.success(this.translateService.instant('message.registered'));
            this.registerForm.reset();
            this.router.navigate(['']);
          });
      })
      .catch((err) => console.log(err));
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.registerForm.dirty) {
      result = confirm(message);
    }

    return result;
  }
}
