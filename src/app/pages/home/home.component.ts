import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  movies:Movie[]=[];
  moviesSlideShow:Movie[]=[];

  @HostListener('window:scroll',['$event'])
  onScroll(){
    const POS = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const MAX = (document.documentElement.scrollHeight || document.body.scrollHeight);
    // console.log(POS,MAX);
    if(POS>MAX){

      if(this.pelServ.cargando){
        return;
      }

      this.pelServ.getCartelera().subscribe(_movies=>{
      this.movies.push(..._movies)
    });
    }
  }

  constructor( private pelServ :PeliculasService ) { }

  ngOnInit(): void {
    this.pelServ.getCartelera().subscribe(_movies=>{
      // console.log(resp);
      this.movies=_movies;
      this.moviesSlideShow=_movies;
    });
  }

   //La cartelera siempre mostrara la pagina 1, se resetea cada que se va a otra pagina, osea cada que se destruye el componente
  ngOnDestroy() {
    this.pelServ.resetCarteleraPage();
    
  }

}
