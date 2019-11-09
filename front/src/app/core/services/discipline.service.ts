import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DisciplineModel } from '../models/discipline.model';

@Injectable({
    providedIn: 'root'
})
export class DisciplineService {
    private api = environment.api;

    private coursesUrl = "courses";
    private url = "disciplines"; 

    constructor(private http: HttpClient){}

    public findPage(courseId: number) : Observable<any> {
        const httpParams = new HttpParams()
            .append("start", '0')
            .append("limit", '10')
            .append("courseId", courseId.toString());

        return this.http.get(`${this.api}/${this.coursesUrl}/${courseId}/disciplines`, { params: httpParams });
    }

    public add(discipline: DisciplineModel) : Observable<any>{
        return this.http.post(`${this.api}/${this.url}`, discipline, {});
    }
}