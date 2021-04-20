import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieResponse;
  public cast: Cast[] = [];

  constructor( private acivatedrouter: ActivatedRoute,
                        private peliculaservice: PeliculasService,
                        private location: Location,
                        private router: Router ) { }

  ngOnInit(): void {
    
    const id = this.acivatedrouter.snapshot.params.id;
    
    combineLatest([

      this.peliculaservice.getPeliculaDetalle( id ),
      this.peliculaservice.getCast( id )

    ]).subscribe( ( [pelicula, cast] ) => {
      
      if ( !pelicula ) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.movie = pelicula;  
      this.cast = cast.filter( actor => actor.profile_path !== null );
    });
    
    // this.peliculaservice.peliculaDetalle(id).subscribe(_movie=>{
    //   if ( !_movie ) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.movie=_movie;
    // });

    // this.peliculaservice.getCast( id ).subscribe( cast => {
    //   console.log(cast)
    //   this.cast = cast.filter( actor => actor.profile_path !== null );
    // });

  }

  
    

  onRegresar() {
    this.location.back();
  }

}
