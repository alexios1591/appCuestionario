import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { RolComponent } from './rol/rol.component';
import { RespondentsComponent } from './respondents/respondents.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'rol',
        component: RolComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'encuestas',
        component: RespondentsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
