import { Injectable } from "@angular/core";
import { Product } from "../products/product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService{
    
    private products: Product[] = [];
    private totalPrice: number;

    constructor(){}


    getProducts(){
        return this.products;
    }

    addProduct(product: Product){
        this.products.push(product);
        sessionStorage.setItem('products', JSON.stringify(this.products))
    }

    deleteByNumberCart(index: number){
        if (index > -1) {
            this.products.splice(index, 1);
    }
}

 containsItems(): boolean {
    return sessionStorage.getItem('products') !== null;
  }

  
    emptyCart(){
        this.products = [];
    }

    setTotalPrice(price: number){
        this.totalPrice = price;

    }

    getTotalPrice(): number{
        return this.totalPrice;
    }

}