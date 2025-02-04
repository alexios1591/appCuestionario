import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ConsentimientoComponent } from './page/cuestionario/consentimiento/consentimiento.component';
import { InsertarComponent } from './page/cuestionario/insertar/insertar.component';
import { CuestionarioComponent } from './page/cuestionario/cuestionario/cuestionario.component';
import { LoginComponent } from './admin/login/login.component';
import { ValidacionDniComponent } from './page/cuestionario/validacion-dni/validacion-dni.component';
import { CuestionarioGuard } from './guards/cuestionario.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'cuestionario', component: CuestionarioComponent, canActivate: [CuestionarioGuard]},
    {path: 'consentimiento', component: ConsentimientoComponent, canActivate: [CuestionarioGuard]},
    {path: 'registrar', component: InsertarComponent, canActivate: [CuestionarioGuard]},
    {path: 'login', component: LoginComponent, canActivate: [CuestionarioGuard]},
    {path: 'validar', component: ValidacionDniComponent, canActivate: [CuestionarioGuard]},
    {path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)}
];
