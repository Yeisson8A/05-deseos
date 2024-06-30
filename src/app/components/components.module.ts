import { NgModule } from '@angular/core';

// Libreria necesaria en caso de que vamos a usar directivas como:
// ng-If, ng-For, ng-Switch...
import { CommonModule } from '@angular/common';
// Libreria que proporciona funcionalidad de ionic
import { IonicModule } from '@ionic/angular';

// Componentes
import { ListasComponent } from './listas/listas.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    ListasComponent
  ],
  exports: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
