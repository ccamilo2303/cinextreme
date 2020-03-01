import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication-service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CodeService } from '../code.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public nombres: string;
  public email: string;
  public pass: string;
  public load: boolean;
  public registroF: boolean = true;
  public pago: boolean = false;
  public tipo: string = '';
  public codigo: string = '';
  private loginComponent: LoginComponent;

  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private codeService: CodeService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p != undefined && p['tipo'] != undefined) {
        this.tipo = p['tipo'];
      }
    });
    this.loginComponent = new LoginComponent(this.authenticationService, this.router);

  }

  registro() {
    if (this.nombres == undefined || this.nombres.split(' ').join('') == '') {

      Swal.fire('Error', 'El campo Nombres no puede estar vacío', 'error');
      return;
    }
    if (this.email == undefined || this.email.split(' ').join('') == '') {

      Swal.fire('Error', 'El campo Email no puede estar vacío', 'error');
      return;
    }
    if (this.pass == undefined || this.pass.split(' ').join('') == '') {
      Swal.fire('Error', 'El campo Contraseña no puede estar vacío', 'error');
      return;
    }

    this.codigo = this.codigo.split(' ').join();
    if (this.codigo != '') {

      this.codeService.validarCodigo(this.codigo, this.email).then(res => {
        if (res['error'] == true) {
          Swal.fire('Error', res['mensaje'], 'error');
          return;
        }
        let random = Math.floor(Math.random() * 1000001);


        this.codeService.generarSuscripcion(this.email, random, 1).then(res => {
          if (res['error'] == true) {
            Swal.fire('Error', res['mensaje'], 'error');
            return;
          }

          this.codeService.actualzarSuscripcion(random, 'DEMO').then(res => {
            if (res['error'] == true) {
              Swal.fire('Error', res['mensaje'], 'error');
              return;
            }

            this.registrar(true);

          }, error => {
            Swal.fire('Error', 'Ocurrió un error al momento de validar el código promocional', 'error');
            console.log("", error);
            return;
          })

        }, error => {
          Swal.fire('Error', 'Ocurrió un error al momento de generar la suscripcion', 'error');
          console.log("", error);
          return;
        });

      }, error => {
        Swal.fire('Error', 'Ocurrió un error al momento de validar el código promocional', 'error');
        console.log("", error);
        return;
      })
    } else {
      let random = Math.floor(Math.random() * 8000001);
      localStorage.setItem("idPago", random.toString());
      this.codeService.generarSuscripcion(this.email, random, 1).then(res => {
        if (res['error'] == true) {
          Swal.fire('Error', res['mensaje'], 'error');
          return;
        }
        this.registrar(false);
      });
    }

    this.load = true;


  }


  private registrar(codigo) {
    this.authenticationService.registrar(this.email, this.pass).then(res => {
      this.load = false;
      this.authenticationService.registrarUsuario(this.nombres, this.email);

      if (codigo == false) {
        Swal.fire('Correcto!', 'Usuario registrado correctamente, escoge un plan que se ajuste a tu necesidad', 'success');
        this.registroF = false;
        this.pago = true;
        localStorage.setItem('nombres', this.nombres);
        localStorage.setItem('email', this.email);
      } else {
        Swal.fire('Correcto!', 'Usuario registrado correctamente, tu cuenta estará activa por un día para disfrutar de todo nuestro contenido.', 'success');
        this.loginComponent.email = this.email;
        this.loginComponent.pass = this.pass;
        this.loginComponent.login();
      }

    })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
        this.load = false;
      });
  }
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}