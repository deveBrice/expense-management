import { Injectable, signal } from "@angular/core";
import { RefundManager } from '../interfaces/refund-manager.interface'
import { refundList } from "../interfaces/refund-manager.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class RefundManagerDemoService {

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
        refundList: [
            {

                wording: 'Frais de paiement',
                amount: 3.40,
                date: '30/10/2025'

            },
            {

                wording: 'Frais de paiement',
                amount: 9.47,
                date: '30/10/2025'

            },
            {

                wording: 'Frais de paiement',
                amount: 9.37,
                date: '30/10/2025'

            },
            {

                wording: 'Frais de paiement',
                amount: 6.00,
                date: '30/10/2025'

            },
            {

                wording: 'Frais de paiement',
                amount: 4.00,
                date: '30/10/2025'

            },
            {

                wording: 'Uber Eats',
                amount: 4.00,
                date: '30/10/2025'

            }
        ]
    })

    constructor(public httpclient: HttpClient) { }

    public getRefundList() {
        let refundManagerList = this.refundManagerList()
        if (refundManagerList.totalAmount === 0 && refundManagerList.refundList.length !== 0) {
            return this.refundCalculate(refundManagerList);
        } else {
            return refundManagerList
        }
    }

    public test() {
        return this.refundManagerList()
    }

    public refundCalculate(refundManagerList: RefundManager) {
        const initialValue = 0;
        refundManagerList.totalAmount = refundManagerList.refundList.reduce(
            (accumulator: number, currentValue: any) => {

                return accumulator + +currentValue.refundData.amount;
            },
            initialValue
        );

        return refundManagerList;
    }

    public currentMonth() {
        let month = (this.date.getMonth() + 1).toString().padStart(2, "0")
        return this.monthsList[+month - 1]
    }

    public addNewRefund(refund: refundList) {
        this.refundManagerList().refundList.push(refund);
        this.refundCalculate(this.refundManagerList())
    }

    public refundUpdate(newRefund: number) {
        this.refundManagerList().totalAmount = newRefund;
    }

    public dateFormat(newdate: Date) {
        console.log(newdate)
        const date = new Date(newdate);
        if (date.toString() !== 'Invalid Date' && newdate !== null) {

            const day = date.getDate().toString().padStart(2, "0")
            const month = (date.getMonth() + 1).toString().padStart(2, "0")
            const year = date.getFullYear()
            return day + '/' + month + '/' + year;
        } else {
            return ''
        }
    }
}