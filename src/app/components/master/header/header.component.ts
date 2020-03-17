import { Component, OnInit } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faPlane = faPlane;

  constructor() { }

  ngOnInit(): void {
  }

  changeLanguage(lang: string) {

  }

}
