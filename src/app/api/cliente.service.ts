import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private httpClient = inject(HttpClient);

  getAll(id: number, page: number, dni: string): Observable<any> {
    return this.httpClient.get<any>(
      `/clientes/getall/${id}?page=${page}&dni=${dni}`
    );
  }

  getCustomers(): Observable<any> {
    return this.httpClient.get<any>(`/customers`);
  }

  insert(cliente: any): Observable<any> {
    return this.httpClient.post<any>(`/cliente`, cliente);
  }

  update(cliente: any): Observable<any> {
    return this.httpClient.put<any>(`/cliente`, cliente);
  }

  getByDni(dni: string): Observable<any> {
    return this.httpClient.get<any>(`/clientes/${dni}`);
  }

  getUnsurveyed(ipage: number, dni: string): Observable<any> {
    return this.httpClient.get<any>(`/clientes/unsurveyed?page=${ipage}&dni=${dni}`);
  }
}
