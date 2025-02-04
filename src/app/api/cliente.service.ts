import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl = "http://127.0.0.1:8000/api"

  private httpClient = inject(HttpClient)

  getAll(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/clientes/getall/${id}`);  
  }

  getCustomers(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/customers`);  
  }

  insert(cliente: any): Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/cliente`, cliente); 
  }

  getByDni(dni: string): Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/clientes/${dni}`)
  }

}
