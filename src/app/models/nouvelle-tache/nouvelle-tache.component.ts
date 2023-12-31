import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { Taches } from 'src/app/dataModels/taches';
import { User } from 'src/app/dataModels/user';

@Component({
  selector: 'app-nouvelle-tache',
  templateUrl: './nouvelle-tache.component.html',
  styleUrls: ['./nouvelle-tache.component.css']
})
export class NouvelleTacheComponent {
  tache: Taches;
  data: any;
  family: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.tache = new Taches();
  }

  ngOnInit(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
        this.family = this.userService.findFamillyByName(this.data.nom)
      }
    });
  }

  gotoTache(){
    this.router.navigate(['/tache']);
  }

  onSubmit() {
    console.log('====================================');
    console.log(this.tache);
    console.log('====================================');
    this.userService.addTaches(this.tache).subscribe(result => this.gotoTache());
  }
}
