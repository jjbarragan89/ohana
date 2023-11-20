import { Component, OnInit,OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearProductoComponent } from 'src/app/componentes/crear-producto/crear-producto.component';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from 'src/app/servicios/localstorage.service'
import { IProducto, Producto } from '../modelos/productos/producto';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {v4 as uuid} from 'uuid'
import { EditarProductoComponent } from '../componentes/editar-producto/editar-producto.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit ,OnDestroy {

  productos:Producto[] = [];
  constructor(private modalCtrl: ModalController,
              private localstorageservice:LocalstorageService) {}
  ngOnInit(): void {
    this.localstorageservice.productosSubject.subscribe( (productos)  =>{
      this.productos = productos
      this.productos.forEach(producto => {
        this.urlImagen(producto.imagen!)
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
    });
    return `data:image/jpeg;base64,${readFile.data}`
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

}
