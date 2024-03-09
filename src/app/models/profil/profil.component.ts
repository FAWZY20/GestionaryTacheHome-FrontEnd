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
  familly: any;
  user: User;
  formUser: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,

  ) { this.user = new User() }

  getFormUser() {
    this.formUser = true;
  }

  updateUser() {

  }

  deleteUser(id:number) {
    this.userService.deleteUser(id).subscribe(() => {
      if(id == this.data.id){
        this.router.navigate(['/']);
        localStorage.clear();
      }else{
        location.reload();
        console.log("utilisateur supprimer");
      }
    })
  }

  onSubmit() {
    this.user.nom = this.data.nom;
    this.user.password = this.userService.generatePwd();
    this.userService.addUserFamily(this.user).subscribe(() => {
      location.reload()
      console.log("l'utilisateur a etait ajouter avec succes");
    })
  }

  ngOnInit(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
        this.userService.findFamillyByName(decodedData.nom).subscribe(result => {
          const familyArray = Object.values(result);
          this.familly = familyArray.filter(user => user.mail !== decodedData.mail);
        })
      }
    });
  }

}
