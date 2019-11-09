import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private api = environment.api;

    private url = "courses"; 

    constructor(private http: HttpClient){}

    public findAll() : Observable<CourseModel[]>{
        return this.http.get<CourseModel[]>(`${this.api}/${this.url}`);
    }
    public add(course: CourseModel) : Observable<any>{
        return this.http.post(`${this.api}/${this.url}`, course, {});
    }
}