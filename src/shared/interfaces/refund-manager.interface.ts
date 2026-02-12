export interface RefundManager {
    _id?:number
    month: string;
    year: number;
    totalAmount: number;
    refundList: refundList[]
}

export interface refundList {
    id?: number;
    wording: string;
    amount: number;
    date: string;
}
