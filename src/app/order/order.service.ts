import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { DataStorageService } from "../data-storage-service";

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    
    private orders: Order[] = [];

    constructor(private dataStorageService: DataStorageService){}

    getOrders(){
        return this.orders;
    }

    
    setOrders(order: Order[]){
        this.orders = order;
    }

    deleteOrder(order: Order){
        return this.dataStorageService.deleteOrder(order);
    }

    
}