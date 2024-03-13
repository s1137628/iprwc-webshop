import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartService } from "../cart-list/cart.service";
import { DataStorageService } from "../data-storage-service";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    
    private products: Product[] = [];

    constructor(private cartService: CartService, private dataStorageService: DataStorageService){}

    getProducts(){
        return this.products;
    }

    addProduct(product: any){
        this.dataStorageService.postProduct(product);
        
    }

    setProducts(product: any){
        this.products = product;
    }

    editProduct(product: any){
        this.dataStorageService.editProduct(product);
    }

    deleteProduct(product: any){
        return this.dataStorageService.deleteProduct(product);
    }

    addProductToCart(product: Product){
        this.cartService.addProduct(product);
    }

}