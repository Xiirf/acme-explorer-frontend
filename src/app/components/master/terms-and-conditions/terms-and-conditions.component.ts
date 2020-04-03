import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  template: `<div [innerHtml]="myTemplate"></div>`,
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  myTemplate: any = '';
  private htmlFile = 'assets/terms-and-conditions/terms-and-conditions_'
    + this.translateService.currentLang + '.html';

  constructor(
    private translateService: TranslateService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router) {
      const headers: HttpHeaders = new HttpHeaders();
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.htmlFile = 'assets/terms-and-conditions/terms-and-conditions_'
        + event.lang + '.html';
        this.http.get(this.htmlFile, { headers, responseType: 'text' }).subscribe((html: any) => {
          this.myTemplate = sanitizer.bypassSecurityTrustHtml(html);
        });
      });
    }

  ngOnInit(): void {
  }

}
