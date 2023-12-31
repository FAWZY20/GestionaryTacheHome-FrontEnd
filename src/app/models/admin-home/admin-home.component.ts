import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  data: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }

}

