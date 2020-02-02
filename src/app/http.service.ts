import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  consultarCartelera(){

    return this.httpClient.get(environment.ipServicio+'/consultar');

  }

  consultarPelicula(id){

    return this.httpClient.get(environment.ipServicio+'/pelicula/'+id);
    
  }



}
