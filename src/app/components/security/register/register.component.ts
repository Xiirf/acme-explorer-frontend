import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

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
export class RegisterComponent extends TranslatableComponent implements OnInit {
  registerForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private fb: FormBuilder, private translateService: TranslateService) {
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
  }

  onRegister(): void {
    this.authService.register(this.registerForm.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.registerForm.reset();
  }

}
