import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBatallasComponent } from './panel-batallas/panel-batallas.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BatallasRoutes } from './batallas.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PanelBatallasComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(BatallasRoutes),
    NgbModule,
    FormsModule
  ]
})
export class BatallasModule { }
