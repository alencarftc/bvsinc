import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { ToolModel } from '../models/tool.model';

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    private api = environment.api;

    private toolsUrl = "tools"; 

    constructor(private http: HttpClient){}

    public findAll(start, limit) : Observable<any> {
        const httpParams = new HttpParams()
            .append("start", start.toString())
            .append("limit", limit.toString())
            console.log(start, limit)

        return this.http.get(`${this.api}/${this.toolsUrl}`, { params: httpParams });
    }

    public add(tool: ToolModel) : Observable<any> {
        return this.http.post(`${this.api}/${this.toolsUrl}`, tool, {});
    }

    public update(tool: ToolModel) : Observable<any> {
        return this.http.put(`${this.api}/${tool.codigo}`, tool, {});
    }
}