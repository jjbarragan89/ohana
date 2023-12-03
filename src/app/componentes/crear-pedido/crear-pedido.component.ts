import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Producto, TiposProductos, EstadosProductos } from 'src/app/modelos/productos/producto';
import { ModalController } from '@ionic/angular'; 
import { IPedido, Pedido } from 'src/app/modelos/pedidos/Pedido';
import { Cliente } from 'src/app/modelos/clientes/cliente';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crear-pedido-modal',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPedidoComponent  implements OnInit, OnDestroy {

  @Input()
  public productos:Producto[]=[];
  
  public hoy:Date=new Date();
  public clienteVacio:Cliente = {
    activo:true,
    canal:"",
    genero:"",
    id:"",
    identificadorCanal:"",
    nombre:""
  }

  pedidoNuevo:IPedido = {
    cliente:this.clienteVacio,
    productos:this.productos,
    fecha_entrega: new Date('Y-m-d').toString(),
    fecha_creacion:"",
    estado:""
  };

  clientes:Cliente[] = []

  constructor( private modalCtrl:ModalController, private localstorageservice:LocalstorageService ) {
    this.clientes = this.localstorageservice.getClientes(environment.esquemaClientes)
    this.pedidoNuevo.productos = this.productos.filter(producto => producto.seleccionados > 0);

   }

  ngOnInit() {
    this.localstorageservice.clientesSubject.subscribe( clientes =>{
      this.clientes = clientes;
    })
    //this.pedidoNuevo.productos = this.productos;

    this.pedidoNuevo.productos = this.productos.filter(producto => producto.seleccionados > 0);
  }

  ngOnDestroy(){
    //this.localstorageservice.clientesSubject.unsubscribe()
  }

  emitir(){
    if(!this.pedidoIncompleto()){
      this.dismiss('ok')
    }
  }

  dismiss(valido:string){
      if(valido != ''){
        return this.modalCtrl.dismiss(this.pedidoNuevo, 'ok')
      }
      return this.modalCtrl.dismiss(null, 'ko')
  }

  pedidoIncompleto():boolean{
    if(this.pedidoNuevo.cliente.id != "" && 
      this.pedidoNuevo.fecha_entrega != '' &&
      this.pedidoNuevo.productos.length > 0 ){
        return false;
    }
    return true;
  }

  cerrarModal():void{
    this.dismiss('')
  }

  cambioFecha(event:any){
    this.pedidoNuevo.fecha_entrega = event.detail.value.substring(0, 10)
  }
  cambioCliente(event:any){
    this.pedidoNuevo.cliente = this.clientes.find( cliente => cliente.id == event.detail.value)!
  }

}
