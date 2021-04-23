import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, pipe, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../service/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Mutable State Variables
  // We'll want to figure a better way to handle our state variables.
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  // Dependency injection
  constructor(
    private coursesService:CoursesService,
    private dialog: MatDialog
    ) {

  }

  ngOnInit() {
    const courses$ = this.coursesService.loadAllCourses();

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => {
         return courses.filter(course => course.category == 'BEGINNER').sort(sortCoursesBySeqNo)
        })
    );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => {
         return courses.filter(course => course.category == 'ADVANCED').sort(sortCoursesBySeqNo)
        })
    );
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }

}




