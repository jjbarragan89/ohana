import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearProductoComponent } from './crear-producto/crear-producto.component'
import {CrearPedidoComponent } from './crear-pedido/crear-pedido.component'
import { EditarProductoComponent } from './editar-producto/editar-producto.component'
import { MenuComponent } from './menu/menu.component'
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { EditarPedidoComponent } from './editar-pedido/editar-pedido.component';
import { CalendarioShowComponent } from './calendario/calendario.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    CrearProductoComponent,
    MenuComponent, 
    EditarProductoComponent, 
    CrearClienteComponent, 
    EditarClienteComponent,
    ProductoComponent,
    CrearPedidoComponent,    
    EditarPedidoComponent,
    CalendarioShowComponent
  ],
  exports: [
    CrearProductoComponent, 
    MenuComponent, 
    EditarProductoComponent, 
    CrearClienteComponent, 
    EditarClienteComponent,
    ProductoComponent,
    CrearPedidoComponent,    
    EditarPedidoComponent,
    CalendarioShowComponent

  ],
})
export class ComponentesModule {}