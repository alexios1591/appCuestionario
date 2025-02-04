import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   apiUrl = "http://127.0.0.1:8000/api"
  
    private httpClient = inject(HttpClient)
  
    getAll(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/getAll`);  
    }
    getAllUser(id: number): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/getAllUser/${id}`);  
    }
    insert(user: any): Observable<any>{
      return this.httpClient.post<any>(`${this.apiUrl}/usuario`, user); 
    }
    delete(id:number): Observable<any>{
      return this.httpClient.delete<any>(`${this.apiUrl}/usuario/${id}`); 
    }
    updateProfile(user: any, usuario: any): Observable<any>{
      return this.httpClient.put<any>(`${this.apiUrl}/usuario/${usuario}`, user); 
    }
    getRoles(): Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/roles`); 
    }
    createRoles(role: any, id:number): Observable<any>{
      return this.httpClient.post<any>(`${this.apiUrl}/roles/${id}`, role); 
    }
    usuarioRoles(): Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/usuario-roles`); 
    }
    deleteRoles(id: number, admiId: number): Observable<any>{
      return this.httpClient.delete<any>(`${this.apiUrl}/roles/${id}/${admiId}`); 
    }
}
