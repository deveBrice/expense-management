export interface RefundManager {
    totalAmount: number;
    refundManagerData: refundManagerData[]
}

export interface refundManagerData {
   month: string;
   year: number;
   refundData: RefundData;
}

export interface RefundData {
    wording: string;
    amount: number;
    date: string;
}
