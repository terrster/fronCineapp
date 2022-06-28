import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genres, IMovie, Ipeliculas, IpeliculasResponse } from '../interface/peliculas/ipeliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliapiService {
  public apikey: string = 'e5f1e621b6c34b06bdcac160638cb997';

  constructor(private _http: HttpClient, private _router: Router) { }

  getPopulares(): Observable<Ipeliculas[]>{
    let url = `https://api.themoviedb.org/3/trending/movie/week?sort_by=popularity.desc&api_key=${this.apikey}&language=es-MX`;
    return this._http.get<Ipeliculas[]>(url);

  }
  getPelicula(id: any): Observable<IpeliculasResponse>{
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apikey}&language=es&append_to_response=videos`;
    return this._http.get<IpeliculasResponse>(url);
  }

  getSearch(text: string): Observable<Ipeliculas[]>{
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=es&query=${text}&sort_by=popularity.desc&page=1&include_adult=false`;
    return this._http.get<Ipeliculas[]>(url);
  }

  getImagen(text: string): string{
    return `https://image.tmdb.org/t/p/w500/${text}`;
  }

  goto(ruta: any[]): void {
    this._router.navigate(ruta);
  }

  getPeliculabyGenre(id: any): Observable<Ipeliculas[]>{
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apikey}&language=es-MX&sort_by=popularity.desc&page=1&with_genres=${id}`;
    return this._http.get<Ipeliculas[]>(url);
  }

  getGeneros(): Observable<Genres>{
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apikey}&language=es-MX`;
    return this._http.get<Genres>(url);
  }
  
}
