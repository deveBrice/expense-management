import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatDrawerMode, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export type MenuItem = {
   label: string;
   path: string;
   icon: string;
}

@Component({
  selector: 'app-root',
  imports: [
            RouterOutlet, 
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatSidenavModule, 
            MatToolbarModule,
            MatIconModule,
            MatListModule
          ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('expense-management');
  public mode = new FormControl('over' as MatDrawerMode);
  public collapsed = signal<boolean>(false);
  public routersList = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'dashboard'
    },
    {
      label: 'Gestion des remboursements',
      path: 'refundManager',
      icon: ''
    },
    {
      label: 'Gestion des dépenses',
      path: 'expenseManager',
      icon: ''
    }
  ])

  public sinavresize = computed(() => this.collapsed() ? '65px' : '250px')

  public sidenavState(sidenav: MatSidenav) {
   //  sidenav.toggle()
    console.log(sidenav)
     this.collapsed.set(!this.collapsed())
  }
}
