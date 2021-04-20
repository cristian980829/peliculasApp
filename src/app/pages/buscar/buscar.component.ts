import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  
  params:string;
  _movies:Movie[]=[];

  constructor( private activatedRoute: ActivatedRoute,
                      private peliculasService: PeliculasService ) { }


  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      this.peliculasService.buscarPelicula(params.texto).subscribe(movies=>{
        this._movies=movies;
        this.params = params.texto;
      });
    });

  }



}
