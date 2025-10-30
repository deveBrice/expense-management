import { Injectable, signal } from "@angular/core";
import { RefundManager } from '../../shared/interfaces/refund-manager.interface'

@Injectable({
    providedIn: 'root'
})

export class RefundManagerService {

    public refundManagerList = signal<RefundManager>({

        totalAmount: 0,
        refundManagerData: [
            {
                month: 'Octobre',
                year: 2025,
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 3.40,
                    date: '30/10/2025'
                }
            },
            {
                month: 'Octobre',
                year: 2025,
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 9.47,
                    date: '30/10/2025'
                }
            },
            {
                month: 'Octobre',
                year: 2025,
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 9.37,
                    date: '30/10/2025'
                }
            },
            {
                month: 'Octobre',
                year: 2025,
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 6.00,
                    date: '30/10/2025'
                }
            },
            {
                month: 'Octobre',
                year: 2025,
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 4.00,
                    date: '30/10/2025'
                }
            }
        ]
    })

}