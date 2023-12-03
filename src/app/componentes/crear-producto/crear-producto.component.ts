import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Producto, TiposProductos, EstadosProductos } from 'src/app/modelos/productos/producto';
import { ModalController } from '@ionic/angular'; 
import { CamaraService } from 'src/app/servicios/camara.service'

@Component({
  selector: 'crear-producto-modal',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearProductoComponent  implements OnInit {

  public tiposProductos = TiposProductos
  public estadosProductos = EstadosProductos
  public keys = Object.keys

  productoNuevo:Producto = {
    id:'',
    nombre:'',
    descripcion: '',
    precio: 0,
    imagen: '',
    tipoProducto:this.tiposProductos.Vela,
    estado: EstadosProductos.Activo,
    inventario:0,
    seleccionados:0
  };

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
        return this.modalCtrl.dismiss(this.productoNuevo, 'ok')
      }
      return this.modalCtrl.dismiss(null, 'ko')
  }

  productoIncompleto():boolean{
    if(this.productoNuevo.descripcion != '' && 
      this.productoNuevo.nombre != '' &&
      this.productoNuevo.precio != 0 ){
        return false;
    }
    return true;
  }

  cerrarModal():void{
    this.dismiss('')
  }

  camara(){
    this.camaraService.agregarGaleria().then(() => {
      this.productoNuevo.imagen = this.camaraService.photos[0].webviewPath
    })
  }

}
