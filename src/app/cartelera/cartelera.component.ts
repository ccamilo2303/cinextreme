import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { HttpService } from '../http.service';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import Swal from 'sweetalert2';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;


@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['../css/styles.css'],
  providers: [NgbRatingConfig]
})
export class CarteleraComponent implements OnInit {
  public peliculas: any;

  public banner = [
    "../img/hero-bg.jpg",
    "../img/irishman-banner.jpg"
  ];

  public currentRate = 4;

  constructor(private navService: NavService, private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService, config: NgbRatingConfig, private spinner: NgxSpinnerService) {
    config.max = 5;
    config.readonly = true;
    this.spinner.show();
  }

  urlBase = undefined;

  ngOnInit() {
    this.navService.iniciarNav();
    let indice = -1;

    if (this.urlBase == undefined) {

      let u = $("#slide").css('background');
      console.log(u);
      u = u.substring(u.indexOf('"') + 1, u.length);
      console.log(u);

      u = u.substring(0, u.indexOf('"'));
      this.urlBase = u;
    }
    //image
    this.httpService.consultarCartelera().subscribe(result => {
      console.log(result);
      this.peliculas = result;
      for (let x of this.peliculas) {
        this.theMovieDataBaseService.consultarImagen(x['id_Tmbd']).subscribe(rImg => {
          x.image = environment.ipImagenTMDB + rImg['poster_path'];
          x.descripcion = rImg['overview'];
          x.duration = rImg['runtime'];
        });
      }
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });

    
    

    setTimeout(() => {
      this.spinner.hide();
    }, 7000);
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

}
