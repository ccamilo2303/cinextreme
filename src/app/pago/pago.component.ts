import { Component, OnInit, Input  } from '@angular/core';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public config:any;
  
  @Input() 
  tipo :string = '';

  constructor() { 
    this.config = environment.payUconfig;
  }

  ngOnInit() {
    console.log("---->",this.tipo);
  }

  public plan(tipo){
    this.config = Object.assign(this.config, environment[tipo]);
    console.log(this.config);
  }

}
