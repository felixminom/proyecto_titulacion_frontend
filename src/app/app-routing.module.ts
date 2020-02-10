import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService} from './login/auth.service'
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path:'paginas', 
    loadChildren:() => import('./paginas/paginas.module').then(m => m.PaginasModule),
    canActivate:[
      AuthService
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[
      AuthService
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [
      AuthService
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
