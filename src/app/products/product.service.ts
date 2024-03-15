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

    addProduct(product: Product){
        this.dataStorageService.postProduct(product);
        
    }

    setProducts(product: Product[]){
        this.products = product;
    }

    editProduct(product: Product){
        this.dataStorageService.editProduct(product);
    }

    deleteProduct(product: Product){
        return this.dataStorageService.deleteProduct(product);
    }

    removeProductFromList(productId: string) {
        this.products = this.products.filter((p) => p.productId !== productId);
      }

    addProductToCart(product: Product){
        this.cartService.addProduct(product);
    }

}