import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToolModel } from 'src/app/core/models/tool.model';
import { CourseModel } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { DisciplineModel } from 'src/app/core/models/discipline.model';
import { DisciplineService } from 'src/app/core/services/discipline.service';
import { AddCourseOrDiscDialogComponent } from '../add-course-or-disc-dialog/add-course-or-disc-dialog.component';
import { ToolService } from 'src/app/core/services/tool.service';

@Component({
  selector: 'si-tool-save-edit',
  templateUrl: './tool-save-edit.component.html',
  styleUrls: ['./tool-save-edit.component.css']
})
export class ToolSaveEditComponent implements OnInit {
  private submitted: boolean = false;
  private newToolForm = this.formBuilder.group({
    title: ['', Validators.required], 
    objective: ['', Validators.required], 
    description: ['', Validators.required], 
    website: ['', Validators.required], 
    classification: ['', Validators.required], 
    type: ['', Validators.required], 
    actors: ['', Validators.required],
  });
  courseFormGroup = this.formBuilder.group({
    course: ['', Validators.required]
  });
  disciplineFormGroup = this.formBuilder.group({
    discipline: ['', Validators.required]
  });
  private courses: CourseModel[];
  private disciplines: DisciplineModel[];

  private choosenCourse: CourseModel;
  private choosenDiscipline: DisciplineModel;

  constructor(private toolService: ToolService,
              private courseDialog: MatDialog,
              private disciplineDialog: MatDialog,
              private courseService: CourseService,
              private disciplineService: DisciplineService,
              private router: Router, 
              private formBuilder: FormBuilder) { }
            
  ngOnInit() {
    this.updateCourses();
  }

  update($event){
    if( $event.selectedIndex == 0 ){
      this.updateCourses();
    }
    else if( $event.selectedIndex == 1 ){
      if( this.choosenCourse ){
        this.updateDisciplines(this.choosenCourse.codigo);
      }
      else {
        const courseId = this.courseFormGroup.get('course').value;
        this.updateDisciplines(courseId);
      }
    }
    else if( $event.selectedIndex == 2 ){
    }
  }

  updateCourses(){
    this.courseService.findAll().subscribe(courses => {
      this.courses = courses;
    });
  }

  updateDisciplines(courseId: number){
    this.disciplineService.findPage(courseId).subscribe(disciplines => {
      this.disciplines = disciplines.data;
    });
  }

  goTo(url){
    this.router.navigate([url]);
  }

  openNewCourseDialog(){
    const courseDialogRef = this.courseDialog.open(AddCourseOrDiscDialogComponent, { 
        width: '350px'
    });

    courseDialogRef.afterClosed().subscribe(data => {
      if( data && data.course ){
        this.updateCourses();
  
        this.courseFormGroup.get('course').setValue(data.course.codigo);
        this.choosenCourse = data.course;
      }
    });
  }

  openNewDisciplineDialog(){
    const disciplineDialogRef = this.disciplineDialog.open(AddCourseOrDiscDialogComponent, { 
        width: '350px',
        data: {
          course: this.findCourse(this.courseFormGroup.get('course').value)
        }
    });

    disciplineDialogRef.afterClosed().subscribe(data => {
      if( data && data.discipline ){
        this.updateDisciplines(data.course.codigo);

        this.disciplineFormGroup.get('discipline').setValue(data.discipline.codigo);
        this.choosenDiscipline = data.discipline;
      }
    });
  }

  findCourse(courseId: number){
    return this.courses.filter(course => course.codigo === courseId)[0]
  }

  onSubmit() {
    const { codigo, title, objective, description, website, classification, type, actors } = this.newToolForm.value;
    const disc_codigo = this.disciplineFormGroup.get('discipline').value;
    const cur_codigo = this.courseFormGroup.get('course').value

    const newTool: ToolModel = {
      codigo: codigo ? codigo : null,
      titulo: title,
      objFerramenta: objective,
      descFerramenta: description,
      siteFerramenta: website,
      clasFerramenta: classification,
      tipoFerramenta: type,
      patFerramenta: actors,
      disc_codigo,
      cur_codigo
    }


    console.log(newTool )
    this.toolService.add(newTool).subscribe(response => {
      this.router.navigate(['ferramentas']);
    });
  }
  
  validate(){
    this.submitted = true;
  
    const { title, objective, description, website, classification, type, actors } = this.newToolForm.value;
    if( !(title && objective && description && website && classification && type && actors) ){
      this.submitted = false;
      return false;
    }
  
    const disciplineId = this.disciplineFormGroup.get('discipline').value;
    if( !( disciplineId ) ){
      this.submitted = false;
      return false;
    }
  
    return true;
  }
}
