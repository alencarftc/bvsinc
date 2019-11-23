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

    public findAll(start, limit, filterData) : Observable<any> {
        var params = "?";

        params += `start=${start}`;
        params += `&limit=${limit}`;
        
        if( filterData.course && filterData.course.length > 0  )
            params += `&course=${filterData.course}`;

        if( filterData.discipline && filterData.discipline.length > 0 )
            params += `&discipline=${filterData.discipline}`;

        if( filterData.search && filterData.search.length > 0 )
            params += `&search=${filterData.search}`;

        return this.http.get(`${this.api}/${this.toolsUrl}${params}`);
    }

    public add(tool: ToolModel) : Observable<any> {
        return this.http.post(`${this.api}/${this.toolsUrl}`, tool, {});
    }

    public update(tool: ToolModel) : Observable<any> {
        return this.http.put(`${this.api}/${tool.codigo}`, tool, {});
    }
}