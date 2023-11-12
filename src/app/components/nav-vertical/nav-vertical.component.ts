import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-vertical',
  templateUrl: './nav-vertical.component.html',
  styleUrls: ['./nav-vertical.component.css']
})
export class NavVerticalComponent {
  data: any;

  constructor(
    private userService: UserService,
    private router: Router,
    ) { }

  deconnexion(): void {
    localStorage.clear();
    console.log('Déconnexion reussite !');
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
        console.log(decodedData);
      }
    });
  }

}
