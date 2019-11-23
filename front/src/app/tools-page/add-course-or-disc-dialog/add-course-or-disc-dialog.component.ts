import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/core/services/course.service';
import { CourseModel } from 'src/app/core/models/course.model'
import { DisciplineModel } from 'src/app/core/models/discipline.model';
import { DisciplineService } from 'src/app/core/services/discipline.service';

@Component({
  selector: 'si-add-course-or-disc-dialog',
  templateUrl: './add-course-or-disc-dialog.component.html',
  styleUrls: ['./add-course-or-disc-dialog.component.css']
})
export class AddCourseOrDiscDialogComponent implements OnInit {
  private sucess: boolean = false;
  private courseFormGroup = this.formBuilder.group({
    course: ['', Validators.required] 
  });
  private disciplineFormGroup = this.formBuilder.group({
    discipline: ['', Validators.required] 
  });
  private isCourseOk: boolean = false;
  private course: CourseModel;
  private discipline: DisciplineModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder, 
              private courseService: CourseService,
              private disciplineService: DisciplineService,
              public dialogRef: MatDialogRef<AddCourseOrDiscDialogComponent>) {}
            
  ngOnInit() {
    if( this.data && this.data.course ) {
      this.isCourseOk = true;
      this.course = this.data.course;
    }

    this.sucess = false;
  }

  onNoClick(): void {
    this.dialogRef.close({
      course: this.course,
      discipline: this.discipline
    });

    this.sucess = false;
  }

  registerNewCourse(){
    const { course: descricao } = this.courseFormGroup.value;

    const newCourse: CourseModel = {
      codigo: null, descricao
    }

    this.courseService.add(newCourse).subscribe(response => {
      this.course = response.content;
      this.sucess = true;
    });
  }

  registerNewDiscipline(){
    const { discipline: descricao } = this.disciplineFormGroup.value;

    const newDiscipline: DisciplineModel = {
      codigo: null, descricao, cur_codigo: this.course.codigo
    } 

    this.disciplineService.add(newDiscipline).subscribe(response => {
      this.discipline = response.content;
      this.isCourseOk = true;
      this.sucess = true;
    });
  }
}
