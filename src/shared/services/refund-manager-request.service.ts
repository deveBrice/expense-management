import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { refundList, RefundManager } from "../interfaces/refund-manager.interface";
import { BehaviorSubject, delay, merge, Observable, ReplaySubject, scan, Subject, switchMap } from "rxjs";
import { ConstantCommon } from "../common/constant.common";


@Injectable({
  providedIn: 'root'
})

export class RefundManagerRequest {
  public momentRplSubject = new ReplaySubject<any>()
  public refreshData$ = new Subject<void>();

  private readonly api_create_new_refund_url: string = ConstantCommon.API_CREATE_NEW_REFUND;
  private readonly api_update_refund_url: string = ConstantCommon.API_UPDATE_REFUND_URL;
  private readonly api_create_refund_url: string = ConstantCommon.API_CREATE_REFUND_URL;
  private readonly api_read_refund_url: string = ConstantCommon.API_READ_REFUND_URL;
  private readonly api_readone_moment_refund_url: string = ConstantCommon.API_READONE_MOMENT_REFUND_URL;
 
  private readonly api_delete_refund_url: string = ConstantCommon.API_DELETE_REFUND_URL;
  
   private readonly api_update_amount_url: string = ConstantCommon.API_UPDATE_AMOUNT_URL;
  private readonly api_refund_filter_url: string = ConstantCommon.API_REFUND_FILTER_URL;

  public httpClient = inject(HttpClient);

  public createNewRefund(refund: RefundManager) {
    return this.httpClient.post<RefundManager>(this.api_create_new_refund_url, refund)
  }

  public refundsObs$: Observable<RefundManager> =
    merge(
      this.momentRplSubject,
      this.refreshData$
    ).pipe(
      delay(200),
      scan((oldValue, currentValue) => {
        if (!oldValue && !currentValue) {
          throw new Error('')
        }
        return currentValue || oldValue
      }),
      switchMap((momentData: any) => {
        console.log(momentData)
        return this.httpClient.get<RefundManager>(this.api_readone_moment_refund_url,
          { params: { ...momentData } }
        )
      })
    )

  public setMomentData(momentData: any): void {
    this.momentRplSubject.next(momentData)
  }

  public reloadRefund(): void {
    this.refreshData$.next();
  }

  getRefund(momentData: any): Observable<RefundManager> {
    return this.httpClient.get<RefundManager>(this.api_readone_moment_refund_url,
      { params: { ...momentData } }
    )

  }

  getRefundTest(momentData: any) {
    this.httpClient.get<RefundManager>(this.api_readone_moment_refund_url,
      { params: { ...momentData } }
    ).subscribe((res: any) => {
      console.log(res)
    })
  }


  createRefund(refundList: any, id: number): Observable<any> {// refundList
    console.log(refundList)
    console.log(id)
    return this.httpClient.post<any>(`${this.api_create_refund_url}/${id}`, refundList)
  }

  updateAmount(refund: RefundManager, totalAmount: number): Observable<RefundManager> {
    return this.httpClient.put<RefundManager>(`${this.api_update_amount_url}/${refund._id}`, refund);
  }

 public updateRefund(refundList: refundList, index: number) {
   return this.httpClient.put<RefundManager>(`${this.api_update_refund_url}/${index}`, refundList)
 }

  deleteRefund(id: number, refundList: any): Observable<void> {

    return this.httpClient.delete<void>(`${this.api_delete_refund_url}/${id}`,
      { params: { ...refundList, ...refundList.refundData } }
    )
  }

  public refundFilter(filterList: any, id: number) {
    return this.httpClient.get<any>(`${this.api_refund_filter_url}/${id}`,
      { params: { ...filterList } }
    )
  }

}