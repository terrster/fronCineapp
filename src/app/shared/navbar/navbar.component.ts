import { Component, OnInit } from '@angular/core';
import { PeliapiService } from 'src/app/services/peliapi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _peliculas: PeliapiService) { }

  ngOnInit(): void {
  }

}
