import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearProductoComponent } from './crear-producto/crear-producto.component'
import { EditarProductoComponent } from './editar-producto/editar-producto.component'
import { MenuComponent } from './menu/menu.component'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [CrearProductoComponent, MenuComponent, EditarProductoComponent],
  exports: [CrearProductoComponent, MenuComponent, EditarProductoComponent],
})
export class ComponentesModule {}