import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular'; 
import { EstadosPedidos, IPedido } from 'src/app/modelos/pedidos/Pedido';
import { Cliente } from 'src/app/modelos/clientes/cliente';
import { Producto } from 'src/app/modelos/productos/producto';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'editar-pedido-modal',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss'],
})
export class EditarPedidoComponent  implements OnInit {

  public total = 0;
  public clienteVacio:Cliente = {
    activo:true,
    canal:"",
    genero:"",
    id:"",
    identificadorCanal:"",
    nombre:""
  }
  pedido:IPedido = {
    cliente:this.clienteVacio,
    productos:[],
    fecha_entrega: "",
    fecha_creacion:"",
    estado:""
  };

  public mostrarCambioFecha = false;
  public mostrarCambioEstado = false
  public productos:Producto[] = []
  public estados = EstadosPedidos
  public keys = Object.keys

  constructor( private modalCtrl:ModalController, private localstorageservice:LocalstorageService , private alertcontroller:AlertController) {
  }

  ngOnInit() {
    
    this.localstorageservice.getProductos(environment.esquemaProductos).forEach( producto => {
      this.pedido.productos.forEach(productoseleccionado =>{
        if (producto.id == productoseleccionado.id){
          producto.seleccionados = productoseleccionado.seleccionados
        }
      })
      this.productos.push(producto)
      this.calcularTotal();

    })

  }



  emitir(){
    if(!this.pedidoIncompleto()){
      this.dismiss('ok')
    }
  }

  async dismiss(valido:string){
      if(valido != ''){
        console.log("aca tres");

        if(this.productos.some(producto => producto.seleccionados > 0) && this.pedido.estado != 'cancelado' ){
          this.pedido.productos = this.productos.filter(producto => producto.seleccionados > 0)
          return this.modalCtrl.dismiss(this.pedido, 'ok')
        }else{
          console.log("aca dos");

          const alert = await this.alertcontroller.create({
            header: 'Atención',
            subHeader: '¿Está segur@ de cancelar este pedido?',
            message: 'Si cancela el pedido, no se podrá recuperar los datos relacionados en el futuro.',
            buttons: [
              {
                text: 'Cerrar',
                role: 'cancel',
              },
              {
                text: 'Cancelar Pedido',
                role: 'confirm',
                handler: () => {
                  this.setResult('ok')
                  return this.alertcontroller.dismiss()
                },
              },
            ],
          });
          await alert.present()
          

        }
      }else{
        console.log("aca uno");
        return this.modalCtrl.dismiss(null, 'ko')
      }
      return
  }

  setResult(ev:string) {
    console.log(`Dismissed with role: ${ev}`);
    if(ev == 'ok'){
      this.pedido.productos = []
      this.pedido.estado = 'cancelado'
      this.alertcontroller.dismiss()
      this.modalCtrl.dismiss(this.pedido, 'ok')
    }
    return
  }

  pedidoIncompleto():boolean{
    if(this.pedido.cliente.id != "" && 
      this.pedido.fecha_entrega != '' &&
      this.productos.some(producto => producto.seleccionados >0) ){
        return false;
    }
    return true;
  }

  cerrarModal():void{
    this.dismiss('')
  }

  cambioFecha(event:any){
    this.pedido.fecha_entrega = event.detail.value.substring(0, 10)
  }

  agregarCantidad(e:Event, index:number){
    e.stopPropagation()
    this.productos[index].seleccionados += 1
    this.calcularTotal();

  }

  quitarCantidad(e:Event, index:number){
    e.stopPropagation()
    this.productos[index].seleccionados = (this.productos[index].seleccionados==0)? 0: this.productos[index].seleccionados - 1
    this.calcularTotal();

  }

  mostrarFecha(){
    this.mostrarCambioFecha = !this.mostrarCambioFecha
  }

  mostrarEstado(){
    this.mostrarCambioEstado = !this.mostrarCambioEstado
  }

  calcularTotal(){
    let total = 0
    this.productos.map(producto =>{
      if(producto.seleccionados > 0){
        total += (producto.seleccionados * producto.precio)
      }
    })
    this.total = total
  }

}
