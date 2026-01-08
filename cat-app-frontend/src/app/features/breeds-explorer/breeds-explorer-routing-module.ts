import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BreedsExplorerComponent } from './breeds-explorer.component';

const routes: Routes = [
  { path: '', component: BreedsExplorerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedsExplorerRoutingModule { }