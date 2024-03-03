import { Component } from '@angular/core';
import { User } from 'src/app/dataModels/user';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private router: Router,

  ) { this.user = new User() }

  getFormUser() {
    this.formUser = true;
  }

  onSubmit() {

  }

  gotoHomePage() {
    this.router.navigate(['/']);
  }

  updateUser() {

  }

  deleteUser() {
    this.userService.deleteUser(this.data.id).subscribe(() => {
      this.gotoHomePage();
      localStorage.clear();
      console.log("utilisateur supprimer");
    })
  }

  ngOnInit(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }

}
