import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'refundManager',
        loadComponent: () => import('./refund-manager/refund-manager.component').then(m => m.RefundManagerComponent)
    },
    {
        path: 'expenseManager',
        loadComponent: () => import('./expense-manager/expense-manager.component').then(m => m.ExpenseManagerComponent)
    },
];
