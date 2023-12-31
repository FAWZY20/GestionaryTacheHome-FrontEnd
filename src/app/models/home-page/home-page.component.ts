import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  temoignage: boolean = false;

  constructor(
    private userService: UserService,
  ){}

  ngOnInit(): void{
    
  }
}
