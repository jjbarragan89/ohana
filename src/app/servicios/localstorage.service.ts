import { Injectable } from '@angular/core';
import { Producto } from '../modelos/productos/producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public productosSubject:Subject<any> = new Subject();

  constructor() { }

  saveProducto(esquemaNombre:string, data:Producto):void{
    const esquemaProducto:string | null = localStorage.getItem(esquemaNombre);
    if(esquemaProducto){
      let esquema:Producto[] = JSON.parse(esquemaProducto)
      let esActualizacion = false
      esquema.forEach((producto, index)=>{
        console.log("va  a guardar producto, nuevoproducto", producto, data)
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
}
