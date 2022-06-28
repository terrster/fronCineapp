import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { concatMap, map, mergeMap, pluck, take, tap } from 'rxjs/operators';
import {
  Genre,
  Genres,
  Ipeliculas,
} from 'src/app/interface/peliculas/ipeliculas';
import { PeliapiService } from 'src/app/services/peliapi.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
})
export class PeliculasComponent implements OnInit {
  public ListPeliculas: any[] = [];

  constructor(public _peliculas: PeliapiService) {
    this._peliculas
      .getGeneros()
      .pipe(
        pluck<any, any>('genres'),
        mergeMap((data: Genre[]) => {
          return from(data).pipe(
            concatMap((item: Genre) =>
              this._peliculas.getPeliculabyGenre(item.id).pipe(
                pluck<any, any>('results'),
                map((data) => {
                  return {
                    genero: item.name,
                    peliculas: data,
                  };
                })
              )
            )
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.ListPeliculas.push(data);
          console.log(this.ListPeliculas);
        },
      });
  }

  ngOnInit(): void {}

  
}
