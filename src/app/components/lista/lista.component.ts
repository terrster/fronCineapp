import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, pluck, tap } from 'rxjs/operators';
import { Ipeliculas } from 'src/app/interface/peliculas/ipeliculas';
import { PeliapiService } from 'src/app/services/peliapi.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  public resultados: Ipeliculas[] = [];

  constructor(
    public _peliculas: PeliapiService,
    private sanitizer: DomSanitizer,
    private _Ruta: ActivatedRoute
  ) {
    this._Ruta.params.pipe(
      tap(console.log),
      pluck('busqueda'),
      mergeMap((termino) => this._peliculas.getSearch(termino)),
      pluck<Ipeliculas[], Ipeliculas[]>('results'),
    ).subscribe(
      (res) => (this.resultados = res),
    );
    
  }

  ngOnInit(): void {}

  public getUrl(poster: string): any {
    let url = `https://image.tmdb.org/t/p/w220_and_h330_face/${poster}`;
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
