import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsReponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  public cargando = false;

  private carteleraPage=1;
  private baseUrl= 'https://api.themoviedb.org/3';

  get params()  {
    return {
      api_key: '04e329711520c49ff1d74fbced1479d4',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage=1;
  }

  constructor( private http: HttpClient ) { }

  getCartelera():Observable<Movie[]>{
    if(this.cargando){
      return of([]);
    }
    
    this.cargando=true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{params:this.params})
    .pipe(
      map((resp)=>resp.results),
      tap(()=>{
      this.carteleraPage +=1;
      this.cargando=false;
    }));
  }

  buscarPelicula(texto:string):Observable<Movie[]>{
      const params = {...this.params, page: '1', query:texto };
      return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{params})
    .pipe(
      map((resp)=>resp.results)
      // ,tap(()=>{
      // this.carteleraPage +=1;
      // this.cargando=false;
    // })
    );
  }

  getPeliculaDetalle(id:string){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,{params: this.params});
  }

  getCast( id: string ):Observable<Cast[]> {

    return this.http.get<CreditsReponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) ),
    );

  }

}
