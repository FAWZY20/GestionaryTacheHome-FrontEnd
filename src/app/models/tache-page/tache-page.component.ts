import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { Taches } from 'src/app/dataModels/taches';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-tache-page',
  templateUrl: './tache-page.component.html',
  styleUrls: ['./tache-page.component.css']
})
export class TachePageComponent {
  data:any;
  tachesAttente: any;
  tachesEnCour: any;
  updateStatut: any = { statut: 'En_Cour' }

  constructor(
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.allTacheAttente();
    this.allTacheEnCour();
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }

  activerTache(id: number): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.userService.activeTache(decodedData.id, id, this.updateStatut).subscribe(() => {
          location.reload();
          console.log('Tâche mise à jour avec succès.');
        });
      }
    });
  }


  deleteTache(id: number): void {
    this.userService.deleteTache(id).subscribe(() => {location.reload()});
    console.log('la tache et supprimer avec succès. ' + id);
  }

  allTacheAttente(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.userService.getTache(decodedData.id).pipe(
          map((resulta: any) => {
            return resulta.filter((res: any) => res.statut == "En_Attente")
          })).subscribe(allTache => {
            this.tachesAttente = allTache;
          }
          )
      }
    });
  }

  allTacheEnCour(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.userService.getTache(decodedData.id).pipe(
          map((resulta: any) => {
            return resulta.filter((res: any) => res.statut == "En_Cour")
          })).subscribe(allTache => {
            this.tachesEnCour = allTache;
          }
          )
      }
    });
  }

  


}
