import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { RequestService } from '../services/request.service';


@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit{
  batallasLoading = true;
  batallas = [];
  cuentasC = [];
  tiposCuentasBancarias = [];
  entidadesBancarias = [];

  item : any = {
  };
  constructor(
    // public requestServ: RequestService,
    private modalService: NgbModal  ) {}


  ngOnInit(): void {
    this.batallasLoading = true;
    // this.getbatallas();
  // }
  // async getbatallas() { 
  //   const response = await this.requestServ.getBatallasxId('619338bff6aa823e904cefbc');
  //   if (response[0]) {
  //     this.batallas = response[1].respuesta;
  //   }
  //   this.batallasLoading = false;
  // }

  // async gestion() {
  //   let response: any;
  //   if (this.item.edit) {
  //     response = await this.requestServ.editBatalla(
  //       this.item.id,
  //       this.item
  //     );
  //     if (response[0]) {
  //       this.requestServ.showAlert(" Actualizado exitosamente ", "success");
  //     }
  //   } else {
  //     response = await this.requestServ.createBatalla(this.item
  //     );
  //     if (response[0]) {
  //       this.requestServ.showAlert("Creado exitosamente", "success");
  //     }
  //   }
  //   if (response[0]) {
  //     this.modalService.dismissAll();
  //     this.getbatallas();
  //   }
  // }

  // open(content, item ) {
  //   if (item) {
  //     this.item=item;
  //     this.item={...this.item,edit:true}
  //   }else{
  //     this.item={};
  //     this.item={...this.item,edit:false}
    
  //   }
  //   this.modalService.open(content, { size: "xl" });
  // }

  

  // async eliminaritem(id: any) {
  //   Swal.fire({
  //     title: "¿Seguro que desea eliminar este item ?",
  //     text: "Esta acción no se puede revertir ",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#343a40",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Sí",
  //     cancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     if (result.value) {
  //       console.log(id);
  //       const response = await this.requestServ.deleteBatalla(id);
  //       if (response) {
  //         this.getbatallas();
  //       }
  //     }
  //   });
  // }
}
}