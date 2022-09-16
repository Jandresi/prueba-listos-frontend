import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcromineService {

  private api = environment.acromine;

  constructor(private http:HttpClient) { }

  // Realiza la petición get en api de los acronimos
  buscarAcronimo(acronimo:string) {
    return axios.get(`${this.api}?sf=${acronimo}`)
  }

}
