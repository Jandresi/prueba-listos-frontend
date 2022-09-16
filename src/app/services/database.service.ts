import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private api = environment.apiNode;

  constructor(private http: HttpClient) { }

  // Traer el historial de consultas realizadas
  verHistorial() {
    return axios.post(`${this.api}/verHistorial`);
  }

  // Guarda las consultas realizadas a la API de acromine
  guardarAcronimo(acronimo:string) {
    return axios.post(`${this.api}/guardarAcronimo`,{acronimo});
  }
}
