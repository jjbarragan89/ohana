import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageService } from '../servicios/localstorage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit, OnDestroy {


  constructor(private localstorage:LocalstorageService) {
  }

  init(){
   

  }
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }


  onBuscar(termino:any){
    if(termino != "" && termino != undefined){
      this.localstorage.onBuscar(termino)
    }
  }

}
