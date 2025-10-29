import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'refundManager',
        loadComponent: () => import('./refund-manager/refund-manager').then(m => m.RefundManager)
    },
    {
        path: 'expenseManager',
        loadComponent: () => import('./expense-manager/expense-manager').then(m => m.ExpenseManager)
    },
];
