import { Injectable, signal } from "@angular/core";
import { RefundManager } from '../../shared/interfaces/refund-manager.interface'
import { refundList } from "../../shared/interfaces/refund-manager.interface";
import { HttpClient } from "@angular/common/http";
import { ConstantCommon } from "../common/constants.common";
import { filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RefundManagerService {

    private readonly api_create_refund_url: string = ConstantCommon.API_CREATE_REFUND_URL;
    private readonly api_read_refund_url: string = ConstantCommon.API_READ_REFUND_URL;
    private readonly api_readone_moment_refund_url: string = ConstantCommon.API_READONE_MOMENT_REFUND_URL;
    //private readonly api_update_refund_url: string = ConstantCommon.API_UPDATE_REFUND_URL;   
    private readonly api_delete_refund_url: string = ConstantCommon.API_DELETE_REFUND_URL;

    public refundDataList = signal<any>({})
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
        month: this.currentMonth(),
        year: new Date().getFullYear(),
        totalAmount: 0,
        refundList: []
    })

    constructor(private httpClient: HttpClient) {
        this.getAllRefund()
    }

    public currentMonth() {
        let month = (this.date.getMonth() + 1).toString().padStart(2, "0")
        return this.monthsList[+month - 1]
    }

    public getNewRefund(): RefundManager {
        return this.refundManagerList()
    }

    public refundCalculate(refundManagerList: RefundManager) {
        const initialValue = 0;
        refundManagerList.totalAmount = refundManagerList.refundList.reduce(
            (accumulator: number, currentValue: any) => {

                return accumulator + +currentValue.refundData.amount
            },
            initialValue
        );

        return refundManagerList;
    }

    public createRefund(refundList: refundList) {
        this.refundManagerList().refundList.push(refundList)
        const refundManagerList = this.refundCalculate(this.refundManagerList())
        return this.httpClient.post(this.api_create_refund_url, refundManagerList, { observe: 'body' })
            .subscribe({
                error: (err) => console.error("Le remboursement n'a pas été rajouté", err)
            })
    }



    public getAllRefund() {
        return this.httpClient.get<RefundManager>(this.api_read_refund_url, {
            observe: 'body'
        })
    }

    public getOneRefund(momentData: any) {
        return this.httpClient.get(this.api_readone_moment_refund_url,
            { params: { ...momentData } })

    }

    public setDate(date: any) {
        this.refundManagerList.update((up) => {
            up.month = date.month
            up.year = date.year
            return up
        })
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

    /*public refundUpdate(newRefunds: RefundManager) {
      
       this.httpClient.put(`${this.api_update_refund_url}/${newRefunds._id}`, newRefunds)
       .subscribe();
    }*/

    /*public refundDelete(newRefunds: RefundManager) {
      
       this.httpClient.delete(`${this.api_update_refund_url}/${newRefunds._id}`)
       .subscribe();
    }*/



}