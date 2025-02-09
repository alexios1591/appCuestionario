import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`/getAll`);
  }
  getAllUser(id: number): Observable<any> {
    return this.httpClient.get<any>(`/getAllUser/${id}`);
  }
  insert(user: any): Observable<any> {
    return this.httpClient.post<any>(`/usuario`, user);
  }
  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`/usuario/${id}`);
  }
  updateProfile(user: any, usuario: any): Observable<any> {
    return this.httpClient.put<any>(`/usuario/${usuario}`, user);
  }
  getRoles(): Observable<any> {
    return this.httpClient.get<any>(`/roles`);
  }
  createRoles(role: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`/roles/${id}`, role);
  }
  usuarioRoles(): Observable<any> {
    return this.httpClient.get<any>(`/usuario-roles`);
  }
  deleteRoles(id: number, admiId: number): Observable<any> {
    return this.httpClient.delete<any>(`/roles/${id}/${admiId}`);
  }
}
