import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {DataStorageService} from "../data-storage-service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { NotificationService } from "../notifications/notification.service";
import { Notification } from "../notifications/notification.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;

  loginChanged = new EventEmitter<void>();
  loginError = new EventEmitter<boolean>(); // Nieuwe EventEmitter voor fouten

  private apiAuthUrl = 'http://s1137628-iprwc.store:8081/api/v1/auth/authenticate';
  private apiRegisterUrl = 'http://s1137628-iprwc.store:8081/api/v1/auth/register'

  constructor(private http: HttpClient, private dataStorageService: DataStorageService, private route: ActivatedRoute,
    private router: Router, private authService: AuthService, private notificationService: NotificationService) {}

    login(credentials: any) {
      this.http.post<any>(this.apiAuthUrl, credentials).subscribe(
        (response) => {
          sessionStorage.setItem('token', response.token);
          const userRole = this.authService.getRole();
          this.router.navigate(['../'], { relativeTo: this.route });
          this.loginChanged.emit();
        },
        (error) => {
          this.loginError.emit(true);
        }
      );
    }

  register(email: string, password: string) {
    const payload = {
      email: email,
      password: password,
      role: 'USER'
    };
    return this.http.post<any>(`${this.apiRegisterUrl}`, payload);
  }

  registerAdmin(email: string, password: string) {
    const payload = {
      email: email,
      password: password,
      role: 'ADMIN'
    };
    return this.http.post<any>(`${this.apiRegisterUrl}`, payload);
  }
  
  
  
}
