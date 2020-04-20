import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-denied-access',
  templateUrl: './denied-access.component.html',
  styleUrls: ['./denied-access.component.css']
})
export class DeniedAccessComponent extends TranslatableComponent implements OnInit {

  url: string;

  constructor(private translateService: TranslateService,
              private route: ActivatedRoute) {
    super(translateService);
  }

  ngOnInit(): void {
    this.url = location.origin + this.route.snapshot.queryParams.previousURL;
  }
}
