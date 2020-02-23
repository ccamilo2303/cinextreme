import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication-service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CodeService } from '../code.service';

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
  public tipo:string = '';
  public codigo:string = '';


  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private codeService:CodeService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p != undefined && p['tipo'] != undefined) {
        this.tipo = p['tipo'];
      }
    });
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

    this.codigo = this.codigo.split(' ').join();
    if(this.codigo != ''){
      this.codeService.validarCodigo(this.codigo, this.email).subscribe(res =>{
        if(res['error'] == true){
          Swal.fire('Error', res['mensaje'], 'error');
          return;  
        }
      }, error=>{
        Swal.fire('Error', 'Ocurrió un error al momento de validar el código promocional', 'error');
        console.log("",error);
        return;
      })
    }

    this.load = true;
    
    this.authenticationService.registrar(this.email, this.pass).then(res => {
      this.load = false;
      this.authenticationService.registrarUsuario(this.nombres, this.email);
      Swal.fire('Correcto!', 'Usuario registrado correctamente, escoge un plan que se ajuste a tu necesidad', 'success');
      this.registroF = false;
      this.pago = true;
      localStorage.setItem('nombres', this.nombres);
      localStorage.setItem('email', this.email);
    })
    .catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.load = false;
    });
  }


}
