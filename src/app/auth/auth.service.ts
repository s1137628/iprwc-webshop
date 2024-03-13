import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './user.model';
import { DataStorageService } from '../data-storage-service';
import { UserService } from './user.service';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  id: any;
  role: string;
  users: any[];
  cUser: any;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private dataStorageService: DataStorageService, private userService: UserService) {}


  public isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  public loggingOut(): void {
    this.router.navigate([''])
    sessionStorage.removeItem('token');
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  // public getRole(): string {
  //   const token = this.getToken();
  //   const decodedToken = this.jwtHelper.decodeToken(token);
  //   return decodedToken.role;
    
  // }

  fetchRole(): Observable<void> {
    return this.dataStorageService.getUsers().pipe(
      map((users) => {
        this.userService.setUsers(users.payload);
        this.users = this.userService.getUsers();
        const token = this.getToken();
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.cUser = this.users.find((s) => s.id === decodedToken.id);
        this.role = this.cUser.role;
      })
    );
  }

  public getRole(): Observable<string> {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.role = decodedToken.role;
    return of(this.role);
  }

  public getUserRole(): String {
    return this.role;
  }

  public getId(): string {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.id;
  }

  public getEmail(): String {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.email;
  }

}
