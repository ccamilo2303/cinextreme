import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @param codigo 
   * @param email 
   */
  validarCodigo(codigo, email) {

    return this.httpClient.get(environment.ipServicio + ('validar-codigo?code='+codigo+"&email="+email) );

  }

  /**
   * @param email 
   * @param idPago 
   * @param diasSuscripcion 
   */
  generarSuscripcion(email, idPago, diasSuscripcion){

    return this.httpClient.post(environment.ipServicio+'suscripcion-ac', {
      email: email,
      id_Pago : idPago,
      dias_Suscripcion : diasSuscripcion
    })

  }

  /**
   * 
   * @param idPago 
   * @param idTransaccion 
   */
  actualzarSuscripcion( idPago, idTransaccion){

  }




}
