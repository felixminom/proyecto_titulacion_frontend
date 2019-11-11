import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PoliticaComponent } from './politica/politica.component';
import { AtributoComponent } from './atributo/atributo.component';
import { ValorComponent } from './valor/valor.component';

const routes: Routes = [{
    path: '',
    component: AdministracionComponent,
    children:[
        {
            path: 'usuarios',
            component:UsuarioComponent
        },
        {
            path: 'politicas',
            component: PoliticaComponent
        },
        {
            path:'tratamientos',
            component: TratamientoComponent
        },
        {
            path: 'atributos',
            component: AtributoComponent
        },
        {
            path: 'valores',
            component: ValorComponent
        },
        {
            path: ''
        }
    ]
}]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdministracionRoutingModule{

}
