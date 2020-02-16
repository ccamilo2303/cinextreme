import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './index/index.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { TrailerComponent } from './trailer/trailer.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { HourPipe } from './hour.pipe';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GeneroComponent } from './genero/genero.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'cartelera',
    component: CarteleraComponent
  },
  {
    path: 'trailer',
    component: TrailerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  
  {
    path: 'pelicula/:idTMDB/:nombre',
    component: PeliculaComponent
  },
  {
    path: 'genero/:id/:nombre',
    component: GeneroComponent
  },
  
  
  {
    path: '**',
    redirectTo: 'index'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CarteleraComponent,
    TrailerComponent,
    LoginComponent,
    RegistroComponent,
    PeliculaComponent,
    SafePipePipe,
    HourPipe,
    FooterComponent,
    GeneroComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),
  //  FontAwesomeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,

    AngularFireAuthModule ,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
