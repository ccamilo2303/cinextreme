import { Component, OnInit, Input  } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import * as uuid from 'uuid';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public config:any;
  
  @Input() 
  tipo :string = '';

  @Input() 
  tipoConfiguracion :string = '';

  public render:boolean = false;

  constructor(private router: Router, private spinner: NgxSpinnerService) { 
    this.config = environment.payUconfig;
  }

  ngOnInit() {
    if(this.tipoConfiguracion != null && this.tipoConfiguracion != undefined && this.tipoConfiguracion != ''){
      this.config = Object.assign(this.config, environment[this.tipoConfiguracion]);
      document.getElementById('btnSend').click();
      return;
    }
    this.render = true;
  }

  public plan(tipo){
    if(this.tipo != undefined && this.tipo != '' && this.tipo === 'index'){
      this.router.navigate(['/registro', tipo]);
      return;
    }
    
    this.config = Object.assign(this.config, environment[tipo]);
    this.config.buyerEmail = localStorage.getItem('email');
    this.config.buyerFullName = localStorage.getItem('nombres');
    this.config.confirmacionEmail = localStorage.getItem('email');
    this.config.referenceCode = uuid.v4();
    
    this.spinner.show();
    setTimeout( ()=>{
      eval("document.getElementById('form').submit()");
    }, 500);
  }

}