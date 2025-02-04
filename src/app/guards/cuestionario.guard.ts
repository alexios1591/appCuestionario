import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CuestionarioGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('usuario');
    if (!user) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
