import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "../guards/auth.guard";
import { RolComponent } from "./rol/rol.component";

export const ADMIN_ROUTES: Routes = [
    {path: '', component: LayoutComponent, children:[
        {path: '', component: HomeComponent, canActivate: [AuthGuard]},
        {path: 'user', component: UserComponent, canActivate: [AuthGuard] },
        {path: 'rol', component: RolComponent, canActivate: [AuthGuard] },

    ]},
];
