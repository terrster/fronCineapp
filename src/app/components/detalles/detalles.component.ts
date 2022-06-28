import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IpeliculasResponse } from 'src/app/interface/peliculas/ipeliculas';
import { PeliapiService } from 'src/app/services/peliapi.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {

  public pelicula: IpeliculasResponse | undefined;
  public urlTrailer: any | undefined = '';
  public playVideo = false;

  constructor(
    public _peliculas: PeliapiService,
    private _activedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this._peliculas
      .getPelicula(this._activedRouter.snapshot.paramMap.get('id'))
      .pipe(map((res) => (this.pelicula = res)))
      .subscribe(console.log);
  }

  ngOnInit(): void {}

  public getUrl(): any {
    let url = `https://image.tmdb.org/t/p/w780/${this.pelicula?.poster_path}`;
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public video() {
    //funcion para reproducir el video de la pelicula
    this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.pelicula?.videos.results[0].key}?autoplay=1`
    );
    this.playVideo = true;
  }

  public videos(){
    if (this.pelicula?.videos.results.length! > 0) {
      return true;
    } else
      return false;
    }
  
}
