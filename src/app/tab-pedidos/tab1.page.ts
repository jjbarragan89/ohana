import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageService } from '../servicios/localstorage.service';
import { environment } from 'src/environments/environment';
import { Pedido } from '../modelos/pedidos/Pedido';
import { ModalController } from '@ionic/angular';
import {EditarPedidoComponent} from 'src/app/componentes/editar-pedido/editar-pedido.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  public mostrarCarrito:boolean = false
  public pedidos:Pedido[]=[]
  
  constructor(private localstorageservice:LocalstorageService, private modalctrl:ModalController) {
    this.pedidos = this.localstorageservice.getPedidos(environment.esquemaPedido)
  }
  
  ngOnInit(): void {
    this.localstorageservice.pedidosSubject.subscribe((pedidos:Pedido[])=>{
      this.pedidos = pedidos
    })
  }
  ngOnDestroy(): void {
    this.localstorageservice.pedidosSubject.unsubscribe();
  }

  abrirCrearPedido(){
    this.mostrarCarrito = !this.mostrarCarrito
  }

  handlerPedidoEmit(event:any){
    this.abrirCrearPedido()
  }

  async irDetallePedido(pedido:Pedido){
    const modal = await this.modalctrl.create({ component: EditarPedidoComponent, componentProps:{pedido:pedido}})
    modal.present()

    const {data, role} = await modal.onWillDismiss()

    if(role == 'ok'){
      this.localstorageservice.savePedido(environment.esquemaPedido, data)
    }
  }
}
