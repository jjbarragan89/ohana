import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/modelos/productos/producto';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { environment } from 'src/environments/environment';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { v4 as uuid} from 'uuid'
import { CrearPedidoComponent } from '../crear-pedido/crear-pedido.component';
import { EstadosPedidos, IPedido, Pedido } from 'src/app/modelos/pedidos/Pedido';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {

  @Input()
  mostrarCrearPedidoBtn:boolean=true;
  @Input()
  esCarrito:boolean = false;
  @Output()
  emitePedido:EventEmitter<any> = new EventEmitter();
  carrito:Producto[] = []
  productos:Producto[] = [];
  @Input()
  pedido:IPedido | null = null ;
  constructor(private modalCtrl: ModalController,
              private localstorageservice:LocalstorageService) {}
  ngOnInit(): void {
    this.localstorageservice.productosSubject.subscribe( (productos)  =>{
      this.productos = productos
      this.productos.forEach(producto => {
        if(producto.imagen){
          this.urlImagen(producto.imagen!)
        }
      });
    } )

    this.init()
  }
  ngOnDestroy(): void {
    this.localstorageservice.productosSubject.unsubscribe();
  }

  init(){
    this.productos = this.localstorageservice.getProductos(environment.esquemaProductos)
    this.productos.forEach(producto => {
      this.urlImagen(producto.imagen!)
    });

    if(this.pedido?.productos.length! > 0){
      this.carrito = this.pedido?.productos!
    }
  }
  
  async abrirCrearProducto() {
    const modal = await this.modalCtrl.create({
      component: CrearProductoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'ok') {
      data.id = uuid();
      const esquemaProducto = environment.esquemaProductos;
      this.localstorageservice.saveProducto(esquemaProducto, data)
    }
  }

  async urlImagen(urlImagen:string){
    const readFile = await Filesystem.readFile({
      path: urlImagen,
      directory: Directory.Documents,
    }).catch(err=>{
      console.log(err)
    });
    if(readFile){
      return `data:image/jpeg;base64,${readFile.data}`
    }
    return ''
  }

  async abrirEditarModal(producto:Producto){
    const modal = await this.modalCtrl.create({component:EditarProductoComponent,componentProps:{producto:producto}})
    modal.present();

    const { data, role } = await modal.onDidDismiss()

    if (role === 'ok') {
      const esquemaProducto = environment.esquemaProductos;
      this.localstorageservice.saveProducto(esquemaProducto, data)
    }
  }

  agregarCantidad(e:Event, index:number){
    e.stopPropagation()
    this.productos[index].seleccionados += 1
    this.actualizarCarrito(this.productos[index]);
  }

  quitarCantidad(e:Event, index:number){
    e.stopPropagation()
    this.productos[index].seleccionados = (this.productos[index].seleccionados==0)? 0: this.productos[index].seleccionados - 1
    this.actualizarCarrito(this.productos[index]);

  }


  actualizarCarrito(productoModificado:Producto):void{
    const producto_indice = this.carrito.findIndex( producto => producto.id == productoModificado.id);

    if(producto_indice != -1){
      this.carrito[producto_indice] = productoModificado;
    }else{
      this.carrito.push(productoModificado)
    }
    
  }

  calcularValorPedido():number{
    let total = 0;
    this.carrito.forEach( producto => {
      if(producto.seleccionados > 0){
        total += (producto.precio * producto.seleccionados)
      }
    })
    return total;
  }

  async crearPedido(){
    const modal = await this.modalCtrl.create({component:CrearPedidoComponent, componentProps: { productos: this.carrito }})
    modal.present()

    const { data, role } = await modal.onWillDismiss()
    if(role == 'ok'){
      data.id = uuid()
      const nuevoPedido = new Pedido(data.id, data.fecha_entrega, data.cliente, data.productos)
      console.log("modelo de pedido", nuevoPedido)
      this.localstorageservice.savePedido( environment.esquemaPedido, nuevoPedido)
      this.carrito = []
      this.init()
      this.emitePedido.emit("reinicia")
    }
  }
}
