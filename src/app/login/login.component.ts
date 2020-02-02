import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  public email : string;
  public pass : string;
  public load: boolean;
 
  ngOnInit() {
  }

  login(){
    if(this.email == undefined || this.email.split(' ').join('') == ''){
      
      Swal.fire('Error', 'El campo Email no puede estar vacío', 'error');
      return;
    }
    if(this.pass == undefined || this.pass.split(' ').join('') == ''){
      Swal.fire('Error', 'El campo Contraseña no puede estar vacío', 'error');
      return;
    }
    this.load = true;
    this.authenticationService.login(this.email, this.pass).then(res => {
      this.load = false;
      this.router.navigate(['/cartelera']);
    })
    .catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.load = false;
    });
  }

  loginGoogle(){
    this.authenticationService.loginConGoogle().then(res=>{
      this.authenticationService.registrarUsuario(res.user['displayName'], res.user['email']);
      this.router.navigate(['/cartelera']);
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.load = false;
    });
  }

  /*registrar(){
    this.authenticationService.SignUp("wwadnres@gmail.com", "123456789").then(res => {
      console.log('Successfully signed up!', res);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    })
  }*/

}
