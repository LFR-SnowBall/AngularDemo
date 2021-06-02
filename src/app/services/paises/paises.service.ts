import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
//ruta o Uri a donde se esta haciendo la petición se puede globalizar el servidor y solo disparar a las rutas
  private API_SERVSER = "http://localhost:8080/pais/";

  constructor(
    private httpClient:HttpClient
  ) { }

  //se solicita al back-end  que recibira informacion del api en la ruta solicitada
  public getAllPaises():Observable<any>{
    return this.httpClient.get(this.API_SERVSER);
  }
}
