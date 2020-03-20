import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';

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
export class LoginComponent extends TranslatableComponent implements OnInit {
  loginForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private fb: FormBuilder, private translateService: TranslateService,
              private fireAuth: AngularFireAuth, private router: Router, private storageService: StorageService,
              private toastr: ToastrService) {
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
  }

  onLogin(): void {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(_ => {
        this.fireAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => {
              this.storageService.setItem('token', token);
              this.toastr.success(this.translateService.instant('message.connected'));
            }
          );
      })
      .catch((err) => {
        console.log(err);
      });
    this.loginForm.reset();
    this.router.navigate(['']);
  }

}
