export interface RefundManager {
    month: string;
    year: number;
    totalAmount: number;
    refundManagerData: refundManagerData[]
}

export interface refundManagerData {
    refundData: RefundData;
}

export interface RefundData {
    wording: string;
    amount: number;
    date: string;
}
