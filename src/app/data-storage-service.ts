import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { Product } from "./products/product.model";
import { Order } from "./order/order.model";
import { User } from "./auth/user.model";

@Injectable()
export class DataStorageService{
    private apiUrl = 'https://s1137628-iprwc.store:8081/api';
    private bearer = sessionStorage.getItem('token');

  constructor(
        private http: HttpClient
        )
{}

postProduct(product: Product) {
  this.getTokenFromStorage().subscribe(
    (token) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const body = {
        name: product.name,
        description: product.description,
        imagePath: product.imagePath,
        price: product.price,
      };

      this.http.post<Product>(`${this.apiUrl}/products`, body, { headers })
        .subscribe((message) => {
        });
    },
    (error) => {
      console.error('Error retrieving or setting token:', error);
    }
  );
}

editProduct(product: Product) {
  this.getTokenFromStorage().subscribe(
    (token) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const productUrl = `${this.apiUrl}/products/${product.productId}`;

      this.http.put<Product>(productUrl, product, { headers })
        .subscribe((updatedProduct) => {
        });
    },
    (error) => {
      console.error('Error retrieving or setting token:', error);
    }
  );
}


deleteProduct(product: Product): Observable<void> {
  return this.getTokenFromStorage().pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const productUrl = `${this.apiUrl}/products/${product.productId}`;
      return this.http.delete<void>(productUrl, { headers });
    })
  );
}

postOrder(order: Order) {
  this.getTokenFromStorage().subscribe(
    (token) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const body = {
        userId: order.userId,
        totalPrice: order.totalPrice,
      };

      this.http.post<Order>(`${this.apiUrl}/orders`, body, { headers })
        .subscribe((message) => {
          // Handle success (e.g., show a success message)
        });
    },
    (error) => {
      console.error('Error retrieving or setting token:', error);
    }
  );
}

public getProducts(): Observable<any> {

  const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.bearer}`});
        return this.http.get<any>(`${this.apiUrl}/products`)
}

getOrders(): Observable<any> {
  return this.getTokenFromStorage().pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<any>(`${this.apiUrl}/orders`, { headers });
    })
  );
}

deleteOrder(order: Order): Observable<void> {
  return this.getTokenFromStorage().pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      
      const orderUrl = `${this.apiUrl}/orders/${order.orderId}`;
      return this.http.delete<void>(orderUrl, { headers });
    })
  );
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

  getTokenFromStorage(): Observable<string> {
    const token = sessionStorage.getItem('token');
    return token ? of(token) : throwError('Token not found');
  }

}

