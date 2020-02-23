import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {



  public estado: string = '';
  public idTransaccion: string = '';
  public reference_pol: string = '';
  public referenceCode: string = '';

  constructor() { }

  ngOnInit() {
    let parametros = location.hash
      .slice(1)
      .split('&')
      .map(p => p.split('='))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      let codigo = parseInt(parametros['transactionState']);
      console.log("--->", codigo);
    switch (codigo) {
      case 4:
        console.log("ENTRO");
        this.estado = "Transacción aprobada";
        break;
      case 6:
        this.estado = "Transacción rechazada";
        break;
      case 7:
        this.estado = "Transacción pendiente";
        break;
      case 104:
        this.estado = "Error";
        break;
      default:
        console.log("ENTRO...");
        this.estado = parametros['mensaje'];
    }

    this.idTransaccion = parametros['transactionId'];
    this.reference_pol = parametros['reference_pol'];
    this.referenceCode = parametros['referenceCode'];
  }



}