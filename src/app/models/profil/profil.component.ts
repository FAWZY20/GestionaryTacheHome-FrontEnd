import { Component } from '@angular/core';
import { User } from 'src/app/dataModels/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  data: any;
  user: User;
  formUser: boolean = false;

  constructor(
    private userService: UserService
  ){this.user = new User()}

  getFormUser(){
    this.formUser = true;
  }

  onSubmit(){

  }

  ngOnInit(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }

}
