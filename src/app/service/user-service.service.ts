import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../dataModels/user';
import { Observable, map } from 'rxjs';


@Injectable({providedIn: 'root'})
export class  UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8081';
  }

  public findUserByMail(mail: String): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/usersByMail?mail=${mail}`);
  }

  public addUser(user: User) {
    return this.http.post<User>(this.usersUrl + '/nouveauCompte', user);
  }

  public login(user: User){
    return this.http.post<User>(this.usersUrl + '/login-success', user).pipe(
      map((response: any) => {
        localStorage.setItem('userAuth', JSON.stringify(response));
        return response;
      })
    );
  }

}
