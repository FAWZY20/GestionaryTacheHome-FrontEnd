import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';

import { User } from 'src/app/dataModels/user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  errorConnexion: boolean = false;
  user: User;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService

  ) { this.user = new User();}


  gotoAdminHome() {
    this.router.navigate(['/home']);
  }

  onSubmit(){
   this.userService.login(this.user).subscribe(result => {
    if(result != null){
      this.errorConnexion = false;
      this.gotoAdminHome(); 
    }else{
      localStorage.clear();
      this.errorConnexion = true;
      console.log("les identifiant sont incorect " + this.errorConnexion);
      
    }
   })
  }

}
