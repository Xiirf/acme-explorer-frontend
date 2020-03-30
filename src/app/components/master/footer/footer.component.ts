import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

import { faFacebook, faTwitter, faGooglePlusG, faLinkedinIn, faDribbble } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends TranslatableComponent implements OnInit {

  today: number;
  numClients: number;

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGooglePlusG = faGooglePlusG;
  faLinkedinIn = faLinkedinIn;
  faDribbble = faDribbble;

  constructor(private translateService: TranslateService) {
    super(translateService);
   }

  ngOnInit(): void {
    this.today = Date.now();
    this.numClients = 12222222;
  }

}
