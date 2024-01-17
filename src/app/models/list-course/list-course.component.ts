import { Component } from '@angular/core';
import { Course } from 'src/app/dataModels/course';
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent {
  formCourse: boolean = false;
  course: Course;
  localStorageData: { key: string; value: any }[] = [];

  constructor(
    private localStorageService: LocalStorageServiceService
  ){this.course = new Course()}

  getFormCourse(): void{
    this.formCourse = true;
  }


  getAllPoduct(): { key: string; value: any }[] {
    const keys = Object.keys(localStorage);
    return keys.map(key => ({ key, value: localStorage.getItem(key) }));
  }

  deleteArticle(key: string){
    localStorage.removeItem(key);
  }

  ngOnInit(): void {
    this.localStorageData = this.localStorageService.getAllItems("userAuth");
  }

  onSubmit(): void {
    const key = this.course.produit;
    const value = this.course.qte;
    this.localStorageService.addItem(key, value);
  }

}
