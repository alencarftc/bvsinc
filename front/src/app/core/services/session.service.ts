import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements OnInit {
    private currentUser = null;
    private api = environment.api;

    constructor(private http: HttpClient, 
                private router: Router){}

    ngOnInit(){
        if ( localStorage.getItem("tkn") ){
            this.currentUser.token = localStorage.getItem("tkn"); 
        }   
    }

    public loginServer(username: string, password: string) : Observable<any>{
        return this.http.post(this.api + "/users/authenticate", { 
            username, password 
        }, {});
    }

    public loginClient(response, redirect){
        this.currentUser = response;
        localStorage.setItem("tkn", JSON.stringify(response));

        this.router.navigate([redirect])
    }

    public register(user: UserModel) : Observable<any>{
        return this.http.post(this.api + "/users", user, {});
    }

    public isLogged(){
        if( localStorage.getItem("tkn") )
            return JSON.parse(localStorage.getItem("tkn"));

        return null;
    }

    public logout(){
        if( localStorage.getItem("tkn") ){
            localStorage.removeItem("tkn")
            this.currentUser = null;
        }
    }
}