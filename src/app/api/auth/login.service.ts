import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = "http://127.0.0.1:8000/api"
  
    private httpClient = inject(HttpClient)
  
    login(NomUsu: string, PassUsu: string): Observable<any> {
      const log = { NomUsu, PassUsu };
      return this.httpClient.post<any>(`${this.apiUrl}/login`, log);  
    }

}
