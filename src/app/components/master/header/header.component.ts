import { Component, OnInit } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  faPlane = faPlane;

  constructor(private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit(): void {
  }

  changeLanguage(lang: string) {
    super.changeLanguage(lang);
  }

}
