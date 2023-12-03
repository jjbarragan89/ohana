import { Component, Input, OnInit } from '@angular/core';
import { EstadosProductos, Producto, TiposProductos } from 'src/app/modelos/productos/producto';
import { ModalController } from '@ionic/angular'; 
import { CamaraService } from 'src/app/servicios/camara.service'

@Component({
  selector: 'editar-producto-modal',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
})
export class EditarProductoComponent  implements OnInit {

  public tiposProductos = TiposProductos
  public estadosProductos = EstadosProductos
  producto:Producto= {
    id:'',
    nombre:'',
    descripcion: '',
    precio: 0,
    imagen: '',
    tipoProducto:this.tiposProductos.Vela,
    estado:this.estadosProductos.Activo,
    inventario:0,
    seleccionados:0
  };

  public keys = Object.keys

  constructor( private modalCtrl:ModalController, private camaraService : CamaraService ) {
  }

  ngOnInit() {}

  emitir(){
    if(!this.productoIncompleto()){
      this.dismiss('ok')
    }
  }

  dismiss(valido:string){
      if(valido != ''){
        return this.modalCtrl.dismiss(this.producto, 'ok')
      }
      return this.modalCtrl.dismiss(null, 'ko')
  }

  productoIncompleto():boolean{
    if(this.producto.descripcion != '' && 
      this.producto.nombre != '' &&
      this.producto.precio != 0 ){
        return false;
    }
    return true;
  }

  cerrarModal():void{
    this.dismiss('')
  }

  camara(){
    this.camaraService.agregarGaleria().then(() => {
      this.producto.imagen = this.camaraService.photos[0].webviewPath
    })
  }

}
