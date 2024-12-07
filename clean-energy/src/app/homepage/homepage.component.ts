import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  // providers: []
})
export class HomepageComponent{

  constructor(private http: HttpClient){ }
  ngOnInit(): void {

  }



}
