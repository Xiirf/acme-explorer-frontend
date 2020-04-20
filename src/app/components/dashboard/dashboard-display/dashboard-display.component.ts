import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Dashboard } from 'src/app/models/dashboard.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent extends TranslatableComponent implements OnInit {

  dashboard: Dashboard;

  constructor(private translateService: TranslateService, private dashboardService: DashboardService) {
    super(translateService);
  }

  ngOnInit(): void {
    this.dashboardService.getDashboard()
      .then((val) => {
        this.dashboard = val[0];
        this.dashboard.statsTopKeyWords = Object.values(this.dashboard.statsTopKeyWords);
      })
      .catch((err) => console.error(err.message));
  }

}
