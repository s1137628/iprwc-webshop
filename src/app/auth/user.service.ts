import { Injectable } from "@angular/core";
import { DataStorageService } from "../data-storage-service";
import { User } from "./user.model";


@Injectable({
    providedIn: 'root'
})
export class UserService{
    
    private users: User[] = [];

    constructor(private dataStorageService: DataStorageService){}

    getUsers(){
        return this.users;
    }

    setUsers(user: any){
        this.users = user;
    }


}