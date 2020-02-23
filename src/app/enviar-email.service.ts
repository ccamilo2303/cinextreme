import { Injectable } from '@angular/core';
import { any } from 'bluebird';

declare var Email:any;

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  constructor() { }

  public enviarEmail(){
    Email.send({
      SecureToken : "87745634-87b1-4dab-b2e7-0def6974266b",
      Host: "smtp.gmail.com",
      Username: "cinextremecol@gmail.com",
      Password: "1qazXSW2",
      To: 'ccamilo2303@gmail.com',
      From: "cinextremecol@gmail.com",
      Subject: "This is the subject",
      Body: "<h1>And this is the body</h1>"
  }).then(
      message => alert(message)
  );
  }
}
