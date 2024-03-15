import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/product.service';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { DataStorageService } from './data-storage-service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AdminComponent } from './admin/admin.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { UserService } from './auth/user.service';
import { ProductEditPopupComponent } from './products/product-edit-popup/product-edit-popup.component';
import { ProductItemEditComponent } from './admin/product-edit/product-item-edit/product-item-edit.component';
import { ProductListAdminComponent } from './admin/product-list-admin/product-list-admin.component';
import { ProductsAdminComponent } from './admin/product-list-admin/products-admin/products-admin.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationService } from './notifications/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartListComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ProductEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AdminComponent,
    OrderComponent,
    UserComponent,
    ProductEditPopupComponent,
    ProductItemEditComponent,
    ProductListAdminComponent,
    ProductsAdminComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ReactiveFormsModule, ProductService, DataStorageService, NotificationService, UserService, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},  HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
