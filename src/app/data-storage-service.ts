import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./products/product.model";
import { Order } from "./order/order.model";
import { User } from "./auth/user.model";

@Injectable()
export class DataStorageService{
    private apiUrl = 'http://localhost:8081/api';
    private bearer = sessionStorage.getItem('token');

  constructor(
        private http: HttpClient
        )
{}

postProduct(product: Product){
  
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearer}`});
  const body = {
      name: product.name,
      description: product.description,
      imagePath: product.imagePath,
      price: product.price
  }
      this.http.post<Product>(`${this.apiUrl}/products`,
      "{\n" +
          "    \"name\": \"" + product.name + "\",\n" +
          "    \"description\": \"" + product.description + "\",\n" +
          "    \"imagePath\": \"" + product.imagePath + "\",\n" +
          "    \"price\": \"" + product.price + "\"\n" +
          "}", {headers})
      .subscribe(message => {
      })
}

editProduct(product: Product) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.bearer}`
  });

  const productUrl = `${this.apiUrl}/products/${product.productId}`;

  this.http.put<Product>(productUrl, product, { headers })
    .subscribe(updatedProduct => {
    });
}

deleteProduct(product: Product): Observable<void> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.bearer}`
  });

  const productUrl = `${this.apiUrl}/products/${product.productId}`;

  return this.http.delete<void>(productUrl, { headers });
}

postOrder(order: Order){
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`});
    const body = {
        userId: order.userId,
        totalPrice: order.totalPrice
    }
        this.http.post<Order>(`${this.apiUrl}/orders`,
        "{\n" +
            "    \"userId\": \"" + order.userId + "\",\n" +
            "    \"totalPrice\": \"" + order.totalPrice + "\"\n" +
            "}", {headers})
        .subscribe(message => {
        })
  }

public getProducts(): Observable<any> {

  const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.bearer}`});
        return this.http.get<any>(`${this.apiUrl}/products`)
}

public getOrders(): Observable<any> {

    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.bearer}`});
          return this.http.get<any>(`${this.apiUrl}/orders`, {headers})
  }


public getUsers(): Observable<any> {

    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.bearer}`});
          return this.http.get<any>(`${this.apiUrl}/users`, {headers})
  }

  createUser(user: User, roles: string) {
    const payload = {
      email: user.email,
      password: user.password,
      role: roles
      
    };
    this.http.post<any>(`${this.apiUrl}/v1/auth/register`, payload)
      .subscribe(() =>{
        this.getUsers();
      });
  }
}

