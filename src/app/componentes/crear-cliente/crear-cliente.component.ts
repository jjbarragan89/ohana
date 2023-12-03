import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Producto, TiposProductos, EstadosProductos } from 'src/app/modelos/productos/producto';
import { ModalController } from '@ionic/angular'; 
import { CamaraService } from 'src/app/servicios/camara.service'
import { Canales, Cliente, Generos } from 'src/app/modelos/clientes/cliente';

@Component({
  selector: 'crear-cliente-modal',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
})
export class CrearClienteComponent  implements OnInit {

  public generos = Generos
  public canales = Canales
  public keys = Object.keys

  cliente:Cliente = {
    id:'',
    nombre:'',
    canal: '',
    identificadorCanal: '',
    genero:'',
    activo: true
  };

  constructor( private modalCtrl:ModalController ) {
   }

  ngOnInit() {}

  emitir(){
    if(!this.clienteIncompleto()){
      this.dismiss('ok')
    }
  }

  dismiss(valido:string){
      if(valido != ''){
        return this.modalCtrl.dismiss(this.cliente, 'ok')
      }
      return this.modalCtrl.dismiss(null, 'ko')
  }

  clienteIncompleto():boolean{
    if(this.cliente.nombre != '' && 
      this.cliente.canal != '' &&
      this.cliente.identificadorCanal != '' ){
        return false;
    }
    return true;
  }

  cerrarModal():void{
    this.dismiss('')
  }


}
