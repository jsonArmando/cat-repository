import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BreedsExplorerComponent } from './breeds-explorer.component';
import { BreedsExplorerRoutingModule } from './breeds-explorer-routing-module';

@NgModule({
  imports: [
    CommonModule,
    BreedsExplorerRoutingModule,
    SharedModule,
    FormsModule,
    BreedsExplorerComponent
    ],
})
export class BreedsExplorerModule { }