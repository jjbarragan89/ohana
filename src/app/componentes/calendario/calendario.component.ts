import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EstadosPedidos, Pedido } from 'src/app/modelos/pedidos/Pedido';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-calendario-show',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioShowComponent  implements OnInit, OnDestroy {
  
  
  //highlightedDates={};
  
  pedidos:Pedido[] = []
  proceso:number=0
  pendiente:number=0
  entregado:number=0
  cancelado:number=0
  todos:number=0

  title= "Calendario de Pedidos"

  constructor(private localstorage:LocalstorageService) {
    this.init() 
  }

  ngOnInit() {
    this.localstorage.pedidosSubject.subscribe(pedidos=>{
      this.init();
      this.contarPedidos()
    })

    this.localstorage.buscadorSubject.subscribe(termino=>{
      this.filtrarPorEstado(termino)
    })
  }

  ngOnDestroy(): void {
    this.localstorage.pedidosSubject.unsubscribe()
  }

  contarPedidos(){
    this.todos = this.pedidos.length
    this.pedidos.forEach(pedido =>{
      if(pedido.estado==EstadosPedidos.Cancelado){
        this.cancelado += 1;
      }
      if(pedido.estado==EstadosPedidos.Entregado){
        this.cancelado += 1;
      }
      if(pedido.estado==EstadosPedidos.Pendiente){
        this.cancelado += 1;
      }
      if(pedido.estado==EstadosPedidos.Proceso){
        this.cancelado += 1;
      }
    })
  }

  init(){
    //Obtener los pedidos formateados para el calendario
    this.pedidos = this.localstorage.getPedidos(environment.esquemaPedido)
    this.todos = this.pedidos.length
    this.proceso=0
    this.pendiente=0
    this.entregado=0
    this.cancelado=0
    this.pedidos.forEach(pedido => {
      let fechaHoraArray = pedido.fecha_entrega.split('T')
      let fecha = fechaHoraArray[0].split('-')
      pedido.date = `${fecha[0]}-${fecha[1]}-${fecha[2]}`
      const {backgroundColor, textColor} = this.getColoresPorEstadoPedido(pedido)
      pedido.backgroundColor = backgroundColor
      pedido.textColor = textColor
      if(pedido.estado==EstadosPedidos.Cancelado){
        this.cancelado += 1;
      }
      if(pedido.estado==EstadosPedidos.Entregado){
        this.entregado += 1;
      }
      if(pedido.estado==EstadosPedidos.Pendiente){
        this.pendiente += 1;
      }
      if(pedido.estado==EstadosPedidos.Proceso){
        this.proceso += 1;
      }
    })

  }

  getColoresPorEstadoPedido(pedido:Pedido){
    let obj = {
      backgroundColor: '',
      textColor: '#111'
    }
    if(pedido.estado == EstadosPedidos.Pendiente){
      obj.backgroundColor = 'rgb(255,165,0)'
    }

    if(pedido.estado == EstadosPedidos.Cancelado){
      obj.backgroundColor = 'rgb(128,128,128)'
    }

    if(pedido.estado == EstadosPedidos.Entregado){
      obj.backgroundColor ='rgb(0,128,0)'
    }

    if(pedido.estado == EstadosPedidos.Proceso){
      obj.backgroundColor = 'rgb(255,0,0)'
    }
    return obj
  }

  getToday(){
    const today = new Date().toLocaleDateString('en-GB');
    const today_split = today.split('/').reverse();
    let r = today_split.join('-') + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
    return r;
  }

  buscarPedido(fecha:any){
    if(fecha?.detail?.value){
      let arr = fecha.detail.value.split('T')
      let pedidos:Pedido[] = this.pedidos.filter(pedido => pedido.fecha_entrega.includes(arr[0]))
      
      if(pedidos.length > 1 ){
          this.title = `Hay ${pedidos.length} pedidos para esta fecha`
      }

      if(pedidos.length > 0 && pedidos.length <= 1){
        this.title = `Cliente:  ${pedidos[0].cliente.nombre} Valor: ${pedidos[0].calcularValorPedido()}`
      }
      
      if(pedidos.length ==0){
        this.title = "Calendario de Pedidos"
      }


    }
  }

  filtrarPorEstado(estado:string){
    this.init()
    if(estado != 'todos'){
      
      this.pedidos = this.pedidos.filter(pedido => {
        if( pedido.estado.toLowerCase() === estado.toLowerCase()){
        return pedido
       }
       return 
      })
    } 
  }

}
