import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication-service.service';
import Swal from 'sweetalert2';
import { CodeService } from '../code.service';

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
  private loginComponent: LoginComponent;

  constructor(public authenticationService: AuthenticationService, private router: Router, private codeService: CodeService) { }

  ngOnInit() {
    this.loginComponent = new LoginComponent(this.authenticationService, this.router);

    let parametros = location.hash
      .slice(1)
      .split('&')
      .map(p => p.split('='))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      let codigo = parseInt(parametros['transactionState']);

    switch (codigo) {
      case 4:
        this.estado = "Transacción aprobada";
        this.codeService.actualzarSuscripcion(parametros['referenceCode'], parametros['reference_pol']).then(res => {
          if (res['error'] == true) {
            Swal.fire('Error', res['mensaje'], 'error');
            return;
          }
          Swal.fire(
            'Transacción Aprobada',
            'Gracias!, tu pago se efectuó con éxito, podrás disfrutar de nuestro contenido durante 30 días a partir de hoy, te invitamos a iniciar sesión',
            'success'
          )
          this.router.navigate(['/login'])
          
        }, error => {
          Swal.fire('Error', 'Ocurrió un error al registrar la suscripción, por favor comúnicate con el servicio de soporte, envíanos el soporte de pago que llegó a tu correo', 'error');
          console.log("", error);
          return;
        })

        break;
      case 6:
        this.estado = "Transacción Rechazada";
        Swal.fire(
          'Transacción rechazada',
          'Tu pago fue rechazado, te enviaremos un email con información más detallada',
          'error'
        )
        this.router.navigate(['/login'])
        break;
      case 7:
        this.estado = "Transacción pendiente";
        Swal.fire(
          'Transacción Pendiente',
          'Tu pago está en proceso, te enviaremos un email cuando finalice',
          'info'
        )
        this.router.navigate(['/login'])
        break;
      case 104:
        this.estado = "Error";
        Swal.fire(
          'Error',
          'Ocurrió un error con tu pago: ',
          'info'
        )
        this.router.navigate(['/login'])
        break;
      default:
        console.log("ENTRO...");
        this.estado = parametros['mensaje'];
    }

    this.idTransaccion = parametros['transactionId'];
    this.reference_pol = parametros['reference_pol'];
    this.referenceCode = parametros['referenceCode']; // codigo nuestro sistema
  }



}