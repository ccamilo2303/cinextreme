import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import Swal from 'sweetalert2';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['../css/styles.css']
})
export class PeliculaComponent implements OnInit {

  public url: string;
  public scripts: Array<string> = new Array();
  public imagenes: Array<string> = new Array();
  public ipImagenTMDB = environment.ipImagenTMDB;
  public nombre:string;
  public descripcion:string;

  /**
   * 
   * @param route 
   * @param httpService 
   * @param theMovieDataBaseService 
   */
  constructor(private route: ActivatedRoute, private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService) {

    this.scripts.push("/assets/jsPelicula/scripts/custom.js");

  }

  ngOnInit() {

    let id = this.route.params.subscribe(p => {
      if (p == undefined || p['id'] == undefined || p['idTMDB'] == undefined ||  p['nombre'] == undefined ) {
        Swal.fire('Error', 'No se puede mostrar la película', 'error');
        return;
      }
      
      this.descripcion = localStorage.getItem(p['idTMDB']);
      this.nombre = p['nombre'];
      this.httpService.consultarPelicula(p.id).subscribe((r: Array<string>) => {
        if (r == null || r == undefined) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }
        if (r.length == 0) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }

        document.getElementById('contenedorVideo').innerHTML = '<div class="videoContainer self-video" id="video130" data-vidid="' + r[0]['url_Movie'] + '"> <div class="closeVideo">&times;</div> </div>'
        this.theMovieDataBaseService.consultarImagenesPelicula(p['idTMDB']).subscribe(i => {
          for (let img of i['backdrops']) {
            this.imagenes.push(img);
          }
          setTimeout( ()=> {
            this.loadScript();
          }, 200);
          
        });

        
      }, err => {
        Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
      });
    });
  }

  async loadScript() {

    for (let x of this.scripts) {
      let node = document.createElement('script');
      node.src = x;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementById('scriptsTemp').appendChild(node);
      await sleep(5);
    }

  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}