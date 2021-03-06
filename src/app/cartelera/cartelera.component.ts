import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { HttpService } from '../http.service';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import Swal from 'sweetalert2';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['../css/styles.css', '../css/card-movie.css', 'cartelera.component.css'],
  providers: [NgbRatingConfig]
})
export class CarteleraComponent implements OnInit {

  public peliculas : any;
  public pageOfItems : Array<any>;
  public ipImagenTMDB :string;
  public p : any;
  public searchText:any;
  public generos : any;

  public banner = [
    "../img/hero-bg.jpg",
    "../img/irishman-banner.jpg"
  ];

  public currentRate = 4;

  constructor(private router: Router, private navService: NavService, private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService, config: NgbRatingConfig, private spinner: NgxSpinnerService) {
    config.max = 5;
    config.readonly = true;
    this.ipImagenTMDB = environment.ipImagenTMDB;
  }

  urlBase = undefined;

  ngOnInit() {
    this.navService.iniciarNav();
    let indice = -1;

   /* if (this.urlBase == undefined) {

      let u = $("#slide").css('background');
      u = u.substring(u.indexOf('"') + 1, u.length);

      u = u.substring(0, u.indexOf('"'));
      this.urlBase = u;
    }*/
    //image
    this.httpService.consultarCartelera().subscribe(result => {
      this.peliculas = result;
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });


    this.httpService.consultarGeneros().subscribe(result => {
      this.generos = result;
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });



/*
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);*/
  }

  /**
   * 
   * @param id 
   * @param descripcion 
   */
  almacenarDescripcion(id, descripcion) {
    console.log("agrega..... ", descripcion);
    localStorage.setItem(id, descripcion);
  }

  /**
   * 
   * @param pageOfItems 
   */
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  pedirPelicula(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      'Por favor escribe el título de la película',
      'Agrega alguna otra descripción u observación'
    ]).then((result) => {
      if (result.value) {
        this.enviarComentario(JSON.stringify(result.value));
        Swal.fire({
          title: 'Gracias!',
          html: `
            Trabajaremos para encontrar tu película, nos contactaremos contigo via email para notificarte. 
          `,
          confirmButtonText: 'Ok!',
          icon: 'success'
        })
      }
    });
  }

  enviarComentario(info){
    console.log("Info: ", info);
  }

  consultarGenero(id, name){
    this.router.navigate(['/genero', id, name]);
  }

}
