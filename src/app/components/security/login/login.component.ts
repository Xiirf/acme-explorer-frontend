import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.service';
import { Observable } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {
  loginForm: FormGroup;
  private updated: boolean;

  matcher = new MyErrorStateMatcher();
  private returnUrl: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private translateService: TranslateService,
              private fireAuth: AngularFireAuth,
              private storageService: StorageService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    super(translateService);
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }

  ngOnInit(): void {
    this.updated = false;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onLogin(): void {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(actor => {
        if (actor.banned) {
          this.loginForm.reset();
          this.toastr.error(this.translateService.instant('message.connect.user.banned'));
        } else {
          this.fireAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => {
              this.updated = true;
              this.storageService.setItem('token', token);
              this.toastr.success(this.translateService.instant('message.connected'));
              this.loginForm.reset();
              this.router.navigateByUrl(this.returnUrl);
            }
          );
        }
      })
      .catch((err) => {
        this.loginForm.reset();
        this.toastr.error(this.translateService.instant('message.errorConnect'));
      });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.loginForm.dirty) {
      result = confirm(message);
    }

    return result;
  }

}
