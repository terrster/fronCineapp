import { Component, OnInit } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PeliapiService } from 'src/app/services/peliapi.service';
import { Ipeliculas } from 'src/app/interface/peliculas/ipeliculas';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public peliculas: Ipeliculas[] = [];

  constructor(private _http: HttpClient, public _peliculas: PeliapiService) {
    this._peliculas.getPopulares().pipe(
      pluck<Ipeliculas[], Ipeliculas[]>('results'),
      map(data => this.peliculas = data),
    ).subscribe(
      (data) => {
        console.log('Peliculas: ', this.peliculas);
        console.log(data);
      }
    );
  }
    
   

  ngOnInit(): void {
  }

  public PeliculaImg(){
    let path =  this.peliculas.map(pelicula => pelicula.poster_path);
    
  }

}
