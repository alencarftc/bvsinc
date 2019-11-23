import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolService } from '../core/services/tool.service'
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CourseService } from '../core/services/course.service';
import { DisciplineService } from '../core/services/discipline.service';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'si-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.css']
})
export class ToolsPageComponent implements OnInit, OnDestroy {
  private tools: any[] = [];
  private totalLength: number = 0;
  private pageSize: number = 6;
  private pageSizeOptions: number[] = [];
  private actualLengthIndex: number = 0;
  private loaded: boolean = false;
  private courses: any[];
  private disciplines: any[];
  private filterFormGroup = this.fb.group({
    courseFilter: [''],
    disciplineFilter: [''],
    searchString: ['']
  });

  private debounce: Subject<string> = new Subject<string>();

  constructor(private toolService: ToolService,          
              private courseService: CourseService,
              private disciplineService: DisciplineService,
              private fb: FormBuilder,
              private router: Router) {}
  
  ngOnInit() {
    this.loadCourses();
    this.update();
  
    this.debounce
      .pipe(debounceTime(1250))
      .subscribe(
        value => { 
            this.filterFormGroup
              .get('searchString')
              .setValue(value);
            this.update();
          }
      );
  }

  ngOnDestroy(){
    this.debounce.unsubscribe();
  }

  loadCourses(){
    this.courseService.findAll().subscribe(courses => {
      this.courses = courses;
    });
  }

  loadDisciplines(courseId){
    this.disciplineService.findAllById(courseId).subscribe(response => {
      this.disciplines = response.data;
    });
  }

  update(){
    const filterData = {
      course: this.filterFormGroup.get('courseFilter').value,
      discipline: this.filterFormGroup.get('disciplineFilter').value,
      search: this.filterFormGroup.get('searchString').value,      
    }

    if( filterData.course )
      this.loadDisciplines(+filterData.course);
    else {
      this.disciplines = []
    }

    this.filterFormGroup
      .get('disciplineFilter')
      .setValue('');

    this.toolService.findAll(this.actualLengthIndex, this.pageSize, filterData).subscribe(response => {
      this.tools = response.data;
      this.totalLength = response.totalCount;
      this.loaded = true;
    });
  }

  goToNewTool(){
    this.router.navigate(['ferramentas', 'novo']);
  }

  paginate($event){
    if( $event.pageIndex > this.actualLengthIndex ){
      this.actualLengthIndex += this.pageSize;
    }
    else {
      this.actualLengthIndex -= this.pageSize;
    }

    this.update();
  }
}