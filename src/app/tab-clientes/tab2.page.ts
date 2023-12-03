import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageService } from '../servicios/localstorage.service';
import { Cliente } from '../modelos/clientes/cliente';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { CrearClienteComponent } from '../componentes/crear-cliente/crear-cliente.component';
import {v4 as uuid} from 'uuid'
import { EditarClienteComponent } from '../componentes/editar-cliente/editar-cliente.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  public clientes:Cliente[]=[];

  constructor(private localstorageservice:LocalstorageService, private modalctrl:ModalController) {
  }

  init(){
    this.clientes = this.localstorageservice.getClientes(environment.esquemaClientes)

  }
  ngOnInit(): void {
    this.localstorageservice.clientesSubject.subscribe( clientes =>{
      this.clientes = clientes
      console.log("llega el subscriptor de clientes", clientes)
    })

    this.init()
  }

  ngOnDestroy(): void {
    this.localstorageservice.clientesSubject.unsubscribe();
  }

  async abrirCrearCliente(){
    let modal = await this.modalctrl.create({component:CrearClienteComponent});
    modal.present();
    const {data, role } = await modal.onWillDismiss()
    if (role === 'ok') {
      data.id = uuid();
      const esquemaCliente = environment.esquemaClientes;
      this.localstorageservice.saveCliente(esquemaCliente, data)
    }
  }

  logoNombre(canal:string){
    if(canal != 'Personal') return `logo-${canal.toLowerCase()}`
    return 'mic'
  }

  async abrirEditarCliente(cliente:Cliente){
    const modal = await this.modalctrl.create({component:EditarClienteComponent, componentProps: {cliente:cliente}})
    modal.present()
    const {data, role} = await modal.onWillDismiss()
    if(role == 'ok'){
      this.localstorageservice.saveCliente(environment.esquemaClientes, data)
    }
  }

}
