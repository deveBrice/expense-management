import { Injectable, signal } from "@angular/core";
import { RefundManager } from '../../shared/interfaces/refund-manager.interface'
import { refundManagerData } from "../../shared/interfaces/refund-manager.interface";

@Injectable({
    providedIn: 'root'
})

export class RefundManagerService {
    public date = new Date();

    public monthsList: string[] = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ]

    public refundManagerList = signal<RefundManager>({
        month: 'Octobre',
        year: 2025, //new Date().getFullYear()
        totalAmount: 0,
        refundManagerData: [
            {
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 3.40,
                    date: '30/10/2025'
                }
            },
            {
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 9.47,
                    date: '30/10/2025'
                }
            },
            {
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 9.37,
                    date: '30/10/2025'
                }
            },
            {
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 6.00,
                    date: '30/10/2025'
                }
            },
            {
                refundData: {
                    wording: 'Frais de paiement',
                    amount: 4.00,
                    date: '30/10/2025'
                }
            }
        ]
    })

    constructor() {
    }

    public getRefundList() {
        let refundManagerList = this.refundManagerList();
        if (refundManagerList.totalAmount === 0 && refundManagerList.refundManagerData.length !== 0) {
            return this.refundCalculate(refundManagerList);
        } else {
            return refundManagerList
        }
    }

    public refundCalculate(refundManagerList: RefundManager) {
        const initialValue = 0;
        refundManagerList.totalAmount = refundManagerList.refundManagerData.reduce(
            (accumulator: number, currentValue: any) => {

                return accumulator + +currentValue.refundData.amount;
            },
            initialValue
        );

        return refundManagerList
    }

    public currentMonth() {
        let month = (this.date.getMonth() + 1).toString().padStart(2, "0")
        return this.monthsList[+month - 1]
    } 

    public addNewRefund(refund: refundManagerData) {
        this.refundManagerList().refundManagerData.push(refund);
        this.refundCalculate(this.refundManagerList())
    }

    public refundUpdate(newRefund: number) {
        this.refundManagerList().totalAmount = newRefund;
    }

}