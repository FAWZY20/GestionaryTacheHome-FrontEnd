import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-tache-page',
  templateUrl: './tache-page.component.html',
  styleUrls: ['./tache-page.component.css']
})
export class TachePageComponent {
  taches: any;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void{
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.userService.getTache(decodedData.id).subscribe(allTach => {
          this.taches = allTach;
        });
      }
    });
  }

}
