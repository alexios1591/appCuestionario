import { Component, inject } from '@angular/core';
import {
  faUsers,
  faUserCheck,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardService } from '../../api/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);

  faUsers = faUsers;
  faUserCheck = faUserCheck;
  faClipboardList = faClipboardList;

  dashboardStats: any = null;


 ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe((data) => {
      this.dashboardStats = data;
    });

 }


}
