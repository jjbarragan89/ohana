import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input()
  titulo_seccion:string=''
  @Output()
  onBuscar:EventEmitter<any>= new EventEmitter()


  mostrarBuscador:boolean=false;

  constructor() { }

  ngOnInit() {}

  toogleBuscador(){
    this.mostrarBuscador = !this.mostrarBuscador
    if(!this.mostrarBuscador) this.emitirBusqueda("")
  }

  emitirBusqueda(evento:any){ 
    console.log("va a emitir", evento)
    this.onBuscar.emit(evento)
  }

}
