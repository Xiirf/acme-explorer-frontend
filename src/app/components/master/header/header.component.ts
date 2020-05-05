import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Actor } from 'src/app/models/actor.model';
import { DateAdapter } from '@angular/material/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  lang: string;
  token: string;
  currenActor: Actor;
  activeRole = 'anonymous';

  keyWordControl = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+$')]);

  constructor(private translateService: TranslateService,
              private authService: AuthService,
              private storageService: StorageService,
              private toastr: ToastrService,
              private dateAdapter: DateAdapter<any>,
              private router: Router) {
    super(translateService);
    this.lang = super.getLanguage();
    this.dateAdapter.setLocale(this.lang);
    this.token = localStorage.getItem('token');
    this.currenActor = this.authService.getCurrentActor();
    if (this.currenActor) {
      this.activeRole = this.currenActor.role.toString();
    }
  }

  ngOnInit() {
    this.storageService.watchStorage().subscribe(() => {
      this.token = localStorage.getItem('token');
      if (this.token === null) {
        this.activeRole = 'anonymous';
        this.currenActor = null;
      } else {
        this.currenActor = this.authService.getCurrentActor();
        this.activeRole = this.currenActor.role.toString();
      }
    });
  }

  sendKeyWord() {
    if (this.router.url !== '/trips' && this.router.url !== '/') {
      localStorage.setItem('keyword', this.keyWordControl.value);
      this.router.navigateByUrl('/');
    }
    this.storageService.setKeyWord(this.keyWordControl.value);
  }

  setKeyword() {
    if (this.keyWordControl.value === '') {
      this.sendKeyWord();
    }
  }

  changeLanguage(lang: string) {
    super.changeLanguage(lang);
    this.lang = super.getLanguage();
    if (this.dateAdapter) {
      this.dateAdapter.setLocale(this.lang);
    }
  }

  onLogout() {
    this.authService.logout()
      .then(
        () => {
          this.toastr.success(this.translateService.instant('message.disconnected'));
        }
      );
  }

}
