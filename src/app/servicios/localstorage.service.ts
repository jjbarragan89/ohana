import { Injectable } from '@angular/core';
import { Producto } from '../modelos/productos/producto';
import { Cliente } from '../modelos/clientes/cliente'
import { Subject } from 'rxjs';
import { IPedido, Pedido } from '../modelos/pedidos/Pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public productosSubject:Subject<any> = new Subject();
  public clientesSubject:Subject<any> = new Subject();
  public pedidosSubject:Subject<any> = new Subject();
  public buscadorSubject:Subject<any> = new Subject();

  constructor() { }

  saveProducto(esquemaNombre:string, data:Producto):void{
    const esquemaProducto:string | null = localStorage.getItem(esquemaNombre);
    if(esquemaProducto){
      let esquema:Producto[] = JSON.parse(esquemaProducto)
      let esActualizacion = false
      esquema.forEach((producto, index)=>{
          if (producto.id == data.id){
            esquema[index] = data
            esActualizacion = true
          }
      })
      if(!esActualizacion){
        esquema.push(data)
      }
      localStorage.setItem(esquemaNombre, JSON.stringify(esquema))
      this.productosSubject.next(esquema);
    }else{
      let esquema:Producto[] = [data];
      localStorage.setItem(esquemaNombre, JSON.stringify(esquema))
      this.productosSubject.next(esquema);
    }
  }

  getProductos(esquemaNombre:string):Producto[]{
    let esquemaProductos = localStorage.getItem(esquemaNombre);
    if(esquemaProductos){
      return JSON.parse(esquemaProductos)
    }
    return []
  }

  saveCliente(esquemaNombre:string, data:Cliente):void{
    const esquemaProducto:string | null = localStorage.getItem(esquemaNombre);
    if(esquemaProducto){
      let esquema:Cliente[] = JSON.parse(esquemaProducto)
      let esActualizacion = false
      esquema.forEach((cliente, index)=>{
          if (cliente.id == data.id){
            esquema[index] = data
            esActualizacion = true
          }
      })
      if(!esActualizacion){
        esquema.push(data)
      }
      localStorage.setItem(esquemaNombre, JSON.stringify(esquema))
      this.clientesSubject.next(esquema);
    }else{
      let esquema:Cliente[] = [data];
      localStorage.setItem(esquemaNombre, JSON.stringify(esquema))
      this.clientesSubject.next(esquema);
    }
  }

  getClientes(esquemaNombre:string):Cliente[]{
    let esquemaClientes = localStorage.getItem(esquemaNombre);
    if(esquemaClientes){
      return JSON.parse(esquemaClientes)
    }
    return []
  }

  savePedido(esquemaNombre:string, data:Pedido):void{
    const esquemaPedido:string | null = localStorage.getItem(esquemaNombre);
    if(esquemaPedido){
      let esquema:Pedido[] = JSON.parse(esquemaPedido)
      let esActualizacion = false
      esquema.forEach((pedido, index)=>{
          if (pedido.id == data.id){
            esquema[index] = data
            esActualizacion = true
          }
      })
      if(!esActualizacion){
        esquema.push(data)
      }
      localStorage.setItem(esquemaNombre, JSON.stringify(esquema))
      let pedidos:Pedido[]=[];
      pedidos = this.generarModelosPedidos(esquema)

      this.pedidosSubject.next(pedidos);
    }else{
      let esquema:Pedido[] = [data];
      localStorage.setItem(esquemaNombre, JSON.stringify(esquema))
      let pedidos:Pedido[]=[];
      pedidos = this.generarModelosPedidos(esquema)
      this.pedidosSubject.next(pedidos);
    }
  }

  getPedidos(esquemaNombre:string):Pedido[]{
    let esquemaPedido = localStorage.getItem(esquemaNombre);
    if(esquemaPedido){
      let modelosString = JSON.parse(esquemaPedido)
      let pedidos:Pedido[]=[];
      pedidos = this.generarModelosPedidos(modelosString)
      return pedidos;
    }
    return []
  }


  generarModelosPedidos(modelosString:Pedido[]):Pedido[]{
    let pedidos:Pedido[]= []
    modelosString.forEach( (pedidostring:Pedido) => {
      let pedido = new Pedido(pedidostring.id, pedidostring.fecha_entrega, pedidostring.cliente, pedidostring.productos, pedidostring.estado);
      pedidos.push(pedido)
    });
    return pedidos;
  }

  onBuscar(termino:any){
    this.buscadorSubject.next(termino)
  }
}
