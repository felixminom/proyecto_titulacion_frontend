import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { Material } from '../../material';
import { MatDialog, MatDialogModule} from '@angular/material';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TratamientoDialogoComponent } from './tratamiento/tratamiento-dialogo/tratamiento-dialogo.component';
import { PaletaColoresComponent } from './tratamiento/tratamiento-dialogo/paleta-colores/paleta-colores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoliticaComponent } from './politica/politica.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AtributoComponent } from './atributo/atributo.component';
import { ValorComponent } from './valor/valor.component';
import { AtributoDialogoComponent } from './atributo/atributo-dialogo/atributo-dialogo.component';
import { PoliticaDialogoComponent } from './politica/politica-dialogo/politica-dialogo.component';
import { UsuarioDialogoComponent } from './usuario/usuario-dialogo/usuario-dialogo.component';
import { ValorDialogoComponent } from './valor/valor-dialogo/valor-dialogo.component';
import { PrevisualizacionComponent } from './politica/previsualizacion/previsualizacion.component';


@NgModule({
  declarations: [
    AdministracionComponent,
    TratamientoComponent,
    TratamientoDialogoComponent,
    PaletaColoresComponent,
    PoliticaComponent,
    UsuarioComponent,
    AtributoComponent,
    ValorComponent,
    AtributoDialogoComponent,
    PoliticaDialogoComponent,
    UsuarioDialogoComponent,
    ValorDialogoComponent,
    PrevisualizacionComponent
  ],
  entryComponents:[
    TratamientoDialogoComponent,
    PaletaColoresComponent,
    AtributoDialogoComponent,
    PoliticaDialogoComponent,
    PrevisualizacionComponent
  ],
  imports: [
    AdministracionRoutingModule,
    CommonModule,
    Material,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule
    
  ],
  providers:[
    MatDialog,
    HttpClient
  ]

})
export class AdministracionModule { }
