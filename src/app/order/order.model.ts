export class Order{
    public orderId: any;
    public userId: any;
    public totalPrice: number;


    constructor(orderId: any, userId: string, totalPrice: number) {
        this.orderId = orderId,
        this.userId = userId,
        this.totalPrice = totalPrice
    }
}