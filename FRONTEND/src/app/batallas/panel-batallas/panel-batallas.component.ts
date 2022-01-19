import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestService } from '../../services/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel-batallas',
  templateUrl: './panel-batallas.component.html',
  styleUrls: ['./panel-batallas.component.css']
})
export class PanelBatallasComponent implements OnInit {
  batallasLoading = true;
  numero : any ;
  carta1:any;
  carta2:any;
  carta3:any;
  carta4:any;
  carta5:any;
  carta6:any;
  carta7:any;
  carta8:any;
  listaS : string ;
  listaCartas : any =  [];
  batallas = [];
  topDies = [];
  topDiesCartas = [];
  cuentasC = [];
  tiposCuentasBancarias = [];
  entidadesBancarias = [];
  loading1 =false;
  loading2 =false;
 

  item : any = {};

  constructor(
    public requestServ: RequestService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.batallasLoading = true;
    this.getbatallas();

  }

  async getbatallas() { 
    const response = await this.requestServ.getBatallas(0);
    if (response[0]) {
      this.batallas = response[1].data;
      console.log(this.batallas)
     
    }
    this.batallasLoading = false;
  }


  async getbatallasPaginacion( numeroPagina : number) { 
    const response = await this.requestServ.getBatallas(numeroPagina);
    if (response[0]) {
      this.batallas = response[1].data;
    }
    this.batallasLoading = false;
  }

  traerTop(){
    this.getTopDiezGanadores();
  }

  
  traerTopCartas(){
    this.getTopDiezCartas();
  }

  async getTopDiezGanadores() { 
    this.loading1=true;
    this.requestServ.showAlert(" Iniciando Proceso de Map-Reduce  ", "success");
    const response = await this.requestServ.getTopDiezGanadores();
    if (response[0]) {
      this.topDies = response[1].data;
      this.requestServ.showAlert(" Proceso de Map-Reduce Terminado ", "success");
    }
    this.loading1 = false;
  }

  async getTopDiezCartas() { 
    this.loading2=true;
    this.requestServ.showAlert(" Iniciando Proceso de Map-Reduce ", "success");
    const response = await this.requestServ.getTop10Cartas();
    
    if (response[0]) {
      this.topDiesCartas = response[1].data;
      this.requestServ.showAlert(" Proceso de Map Reduce Terminado ", "success");
    }
    this.loading2 = false;
  }

  async gestion() {
    let response: any;
    if (this.item.edit) {
      delete this.item["edit"];
      delete this.item["fecha_auditoria"];
      let id = this.item._id;
      delete this.item["_id"];
      response = await this.requestServ.editBatalla(
        id,
        this.item
      );
      if (response[0]) {
        this.requestServ.showAlert(" Actualizado exitosamente ", "success");
      }
    } else {
      this.listaCartas.push(this.item.winner.card1.id)
      this.listaCartas.push(this.item.winner.card2.id)
      this.listaCartas.push(this.item.winner.card3.id)
      this.listaCartas.push(this.item.winner.card4.id)
      this.listaCartas.push(this.item.winner.card5.id)
      this.listaCartas.push(this.item.winner.card6.id)
      this.listaCartas.push(this.item.winner.card7.id)
      this.listaCartas.push(this.item.winner.card8.id)
      this.listaS= "[" + this.listaCartas.toString() + "]" 
      this.item.winner.cards={ list : this.listaS}
      response = await this.requestServ.createBatalla(this.item
      );
      if (response[0]) {
        this.requestServ.showAlert("Creado exitosamente", "success");
      }
    }
    if (response[0]) {
      this.modalService.dismissAll();
      this.getbatallas();
    }
  }

  open(content, item ) {
    if (item) {
      this.item=item;
      this.item={...this.item,edit:true}
    }else{
      this.item={};
      this.item.winner= {}
      this.item.winner.card1= {}
      this.item.winner.card2= {}
      this.item.winner.card3= {}
      this.item.winner.card4= {}
      this.item.winner.card5= {}
      this.item.winner.card6= {}
      this.item.winner.card7= {}
      this.item.winner.card8= {}
      this.item.loser= {tag: null}
     
    }
    this.modalService.open(content, { size: "xl" });
  }

  

  async eliminaritem(id: any) {
    Swal.fire({
      title: "¿Seguro que desea eliminar este item ?",
      text: "Esta acción no se puede revertir ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#343a40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        console.log(id);
        const response = await this.requestServ.deleteBatalla(id);
        if (response) {
          this.getbatallas();
        }
      }
    });
  }
}
