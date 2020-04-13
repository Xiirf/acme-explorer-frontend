import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.css']
})
export class ApplicationDisplayComponent extends TranslatableComponent implements OnInit {

  private idApplication: string;
  application: Application;

  constructor(private route: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              private applicationService: ApplicationService) {
    super(translateService);
  }

  ngOnInit(): void {
    this.idApplication = this.route.snapshot.params.idApplication;
    this.applicationService.getApplication(this.idApplication)
      .then((val) => this.application = val)
      .catch((err) => console.error(err.message));
  }

  goback(): void {
    this.router.navigate(['/']);
  }

}
