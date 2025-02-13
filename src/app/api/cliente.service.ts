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
    return this.httpClient.get<any>(
      `/clientes/unsurveyed?page=${ipage}&dni=${dni}`
    );
  }

  getApiDni(dni: string): Observable<any> {
    const url = `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=`;
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJlbnpvemF2YWxhMTIzQGdtYWlsLmNvbSJ9.dF8z6xdc06sllqie_fIkfgZ_ygrCgOI4TkXnKsgxvZc';
    https: return this.httpClient.get<any>(`${url}${token}`);
  }
}
