import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  public swiper:Swiper;

  @Input() _movies: Movie;

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      
      loop: true

});

}

ngOnInit(): void {
  console.log('peliculas slide:',this._movies);
}

onSlidePrev(){
  this.swiper.slidePrev();
}

  
  onSlideNext(){
    this.swiper.slideNext();
  }
  

}
