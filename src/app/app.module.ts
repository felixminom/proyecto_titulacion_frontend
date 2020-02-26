import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {Material} from './material';
import { PaginasModule } from './paginas/paginas.module';
import { MainNavModule } from './main-nav/main-nav.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotificacionComponent } from './notificacion/notificacion.component';

@NgModule({

  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    HomeComponent,
    NotificacionComponent,
  ],
  entryComponents:[
    NotificacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    Material,
    PaginasModule,
    MainNavModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
