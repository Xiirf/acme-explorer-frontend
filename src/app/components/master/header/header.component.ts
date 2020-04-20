import { Component, OnInit } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  faPlane = faPlane;
  lang: string;
  token: string;
  currenActor: Actor;
  activeRole = 'anonymous';

  constructor(private translateService: TranslateService, private authService: AuthService,
              private storageService: StorageService, private toastr: ToastrService) {
    super(translateService);
    this.lang = super.getLanguage();
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

  changeLanguage(lang: string) {
    super.changeLanguage(lang);
    this.lang = super.getLanguage();
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
