import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})


export class RequestService {
    public breadcrumb = true;
    public LogingLoading = false;
    loading = false;
    master: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private notifier: NotifierService
    ) {

    }

    showAlert(message: string, type: any) {
        this.notifier.notify(type, message);
    }

    tokenIsValid(status: number) {
        if (status === 401) {

            return false;
        }
        return true;
    }





    async getBatallas(pageNumber: any) {
        this.loading = true;
        let params = new HttpParams();
        params = params.append("pageNumber", pageNumber);
        params = params.append("pageSize", '10');
        return new Promise((resolve) => {
            this.http.get(`${environment.apiUrl}/`, { params }).subscribe(
                (response: any) => {
                    this.loading = false;
                    resolve([true, response]);
                },
                (error: any) => {
                    this.loading = false;
                    if (!this.tokenIsValid(error.status)) {
                        this.showAlert("Error al cargar", "error");
                    }
                    resolve([false]);
                }
            );
        });
    }

    

    async getBatallasxId(id: string) {
        this.loading = true;
        const headers = new HttpHeaders({ token: "this.master.apiKey" });
        return new Promise((resolve) => {
            this.http.get(`${environment.apiUrl}/${id}`, {headers}).subscribe(
                (response: any) => {
                    this.loading = false;
                    resolve([true, response]);
                },
                (error: any) => {
                    this.loading = false;
                    if (!this.tokenIsValid(error.status)) {
                        this.showAlert("Error al cargar", "error");
                    }
                    resolve([false]);
                }
            );
        });
    }




    async createBatalla(data: any) {
        this.loading = true;
        return new Promise((resolve) => {
            this.http
                .post(`${environment.apiUrl}`, data)
                .subscribe(
                    (response: any) => {
                        this.loading = false;
                        resolve([true, response.msj]);
                    },
                    (error: any) => {
                        this.loading = false;
                        if (!this.tokenIsValid(error.status)) {
                            this.showAlert("Error al crear ", "success");
                        }
                        resolve([false]);
                    }
                );
        });

    }

    async editBatalla(id: string, data: any) {
        this.loading = true;
        return new Promise((resolve) => {
            this.http
                .put(`${environment.apiUrl}/${id}`, data)
                .subscribe(
                    (response: any) => {
                        this.loading = false;
                        resolve([true, response.msj]);
                    },
                    (error: any) => {
                        this.loading = false;
                        if (!this.tokenIsValid(error.status)) {
                            this.showAlert("Error al editar ", "success");
                        }
                        resolve([false]);
                    }
                );
        });

    }

    async deleteBatalla(id: string) {
        this.loading = true;
        return new Promise((resolve) => {
            this.http
                .delete(`${environment.apiUrl}/${id}`)
                .subscribe(
                    (response: any) => {
                        this.loading = false;
                        this.showAlert(" Eliminado correctamente", "error");
                        resolve([true, response.msj]);
                    },
                    (error: any) => {
                        this.loading = false;
                        if (!this.tokenIsValid(error.status)) {
                            this.showAlert("Error al eliminar ", "success");
                        }
                        resolve([false]);
                    }
                );
        });

    }


    async getTop10Cartas() {
        this.loading = true;
        let params = new HttpParams();
      
        return new Promise((resolve) => {
            this.http.get(`${environment.apiUrl}/top10-cards`, ).subscribe(
                (response: any) => {
                    this.loading = false;
                    resolve([true, response]);
                },
                (error: any) => {
                    this.loading = false;
                    if (!this.tokenIsValid(error.status)) {
                        this.showAlert("Error al cargar", "error");
                    }
                    resolve([false]);
                }
            );
        });
    }

    async getTopDiezGanadores() {
        this.loading = true;
        let params = new HttpParams();
        return new Promise((resolve) => {
            this.http.get(`${environment.apiUrl}/top10-player`).subscribe(
                (response: any) => {
                    this.loading = false;
                    resolve([true, response]);
                },
                (error: any) => {
                    this.loading = false;
                    if (!this.tokenIsValid(error.status)) {
                        this.showAlert("Error al cargar", "error");
                    }
                    resolve([false]);
                }
            );
        });
    }
    


}