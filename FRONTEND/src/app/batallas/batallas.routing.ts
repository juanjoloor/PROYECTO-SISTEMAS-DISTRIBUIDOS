import { Routes } from "@angular/router";
import { PanelBatallasComponent } from "./panel-batallas/panel-batallas.component";




export const BatallasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "batallas-panel",
        component: PanelBatallasComponent,
        data: {
          title: "Batallas Panel",
        },
      
      },
    ],
  },
];
