import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  applications: Application[];
  displayedColumns: string[] = ['trip', 'createdAt', 'status'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private applicationService: ApplicationService,
              private translateService: TranslateService) {
    super(translateService);
    this.initialize();
  }

  ngOnInit(): void {
    this.applicationService.getApplications()
      .then((val) => this.applications = val)
      .catch((err) => console.error(err.message));
  }

  initialize() {
  }

}
