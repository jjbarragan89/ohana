import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import {ComponentesModule} from 'src/app/componentes/componentes.module'

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ComponentesModule],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
