import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient) { }

  validarCodigo(codigo, email) {

    return this.httpClient.get(environment.ipServicio + ('validar-codigo?code='+codigo+"&email="+email) );

  }



}
