import { Component, OnInit } from '@angular/core';
import { EstadosProductos, Producto, TiposProductos } from 'src/app/modelos/productos/producto';
import { ModalController } from '@ionic/angular'; 
import { Canales, Cliente, Generos } from 'src/app/modelos/clientes/cliente';

@Component({
  selector: 'editar-cliente-modal',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss'],
})
export class EditarClienteComponent  implements OnInit {

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

  constructor( private modalCtrl:ModalController) {
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
    if(this.cliente.canal != '' && 
      this.cliente.nombre != '' &&
      this.cliente.identificadorCanal != '' ){
        return false;
    }
    return true;
  }

  cerrarModal():void{
    this.dismiss('')
  }


}
