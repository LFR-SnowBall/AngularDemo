import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  private API_SERVSER = "http://localhost:8080/estados/";

  constructor(private httpClient:HttpClient) { }

  public getAllEstadosByPais(idPais:any):Observable<any>{
    return this.httpClient.get(this.API_SERVSER+idPais);
  }
}
