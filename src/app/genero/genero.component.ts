import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../nav.service';
import Swal from 'sweetalert2';
import { HttpService } from '../http.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['../css/styles.css', '../css/card-movie.css','./genero.component.css']
})
export class GeneroComponent implements OnInit {

  public peliculas: any;
  public ipImagenTMDB :string;
  public id : any;
  public nombre : any;
  public generos : any;
  public searchText:any;
  public p:any;
  constructor(private router: Router, private route: ActivatedRoute, private navService: NavService, private httpService: HttpService) {
    navService.iniciarNav();
    this.ipImagenTMDB = environment.ipImagenTMDB;
  }

  ngOnInit() {

    this.route.params.subscribe(p => {
      if (p == undefined || p['id'] == undefined || p['nombre'] == undefined) {
        Swal.fire('Error', 'No se puede mostrar la película', 'error');
        return;
      }

      this.id = p['id'];
      this.nombre = p['nombre'];

      this.httpService.consultarPeliculaGenero(p['id']).subscribe((r: Array<string>) => {
        if (r == null || r == undefined) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }
        if (r.length == 0) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }
        this.peliculas = r;
      });

      this.httpService.consultarGeneros().subscribe(result => {
        this.generos = result;
      }, err => {
        Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
      });

    });
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

