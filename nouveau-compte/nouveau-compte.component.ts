import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/dataModels/user';

@Component({
  selector: 'app-nouveau-compte',
  templateUrl: './nouveau-compte.component.html',
  styleUrls: ['./nouveau-compte.component.css']
})
export class NouveauCompteComponent {
  user: User;
  confirmPwd: string = "";
  emailExiste: boolean = false;
  submitClicked: boolean = false;
  mdp: boolean = false;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService

  ) { this.user = new User();}


  checkEmail(): void {
    this.userService.findUserByMail(this.user.mail)
      .subscribe(
        (user: User) => {
          if (user) {
            this.emailExiste = true; // L'e-mail existe
          } else {
            this.emailExiste = false; // L'e-mail n'existe pas
          }
        },
        (error) => {
          // Gérer les erreurs ici si nécessaire
          console.error("Erreur lors de la vérification de l'e-mail : ", error);
        }
      );
  }
  

  checkMdp(): boolean{
    if (this.user.password == this.confirmPwd) {
      return this.mdp = true;
    }else{
      return this.mdp = false;
    }
  }

  gotoConnexion() {
    this.router.navigate(['/connexion']);
  }

  onSubmit() {
    this.checkEmail();
    this.submitClicked = true;
    console.log(this.emailExiste);
    if (this.checkMdp() && this.emailExiste) {
      this.userService.addUser(this.user).subscribe(result => this.gotoConnexion());
    } else{
      console.log("L'inscription a echouer verifier votre email ou votre mdp");
    }
  }
}
