import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public nombres:string;
  public email:string;
  public pass:string;
  public load: boolean;
  public registroF:boolean = true;
  public pago:boolean = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  registro(){
    if(this.nombres == undefined || this.nombres.split(' ').join('') == ''){
      
      Swal.fire('Error', 'El campo Nombres no puede estar vacío', 'error');
      return;
    }
    if(this.email == undefined || this.email.split(' ').join('') == ''){
      
      Swal.fire('Error', 'El campo Email no puede estar vacío', 'error');
      return;
    }
    if(this.pass == undefined || this.pass.split(' ').join('') == ''){
      Swal.fire('Error', 'El campo Contraseña no puede estar vacío', 'error');
      return;
    }
    this.load = true;
    
    this.authenticationService.registrar(this.email, this.pass).then(res => {
      this.load = false;
      this.authenticationService.registrarUsuario(this.nombres, this.email);
      Swal.fire('Correcto!', 'Usuario registrado correctamente, escoge un plan que se ajuste a tu necesidad', 'success');
      this.registroF = false;
      this.pago = true;
    })
    .catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.load = false;
    });
  }


}
