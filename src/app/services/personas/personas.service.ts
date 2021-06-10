import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private API_SERVER ="http://localhost:8080/personas/";

  constructor(
    private httpClient: HttpClient
  ) { }
//TODO: Muestra todos los usuarios regsitrados
  public getAllPersonas():Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
//TODO: le manda el formulario traido de components para guardar al usuario en el rest
  public savePersonas(persona:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,persona);
  }
}
