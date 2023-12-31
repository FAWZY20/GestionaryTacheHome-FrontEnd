import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../dataModels/user';
import { Observable, map, take } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { Taches } from '../dataModels/taches';

@Injectable({ providedIn: 'root' })
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8081';
  }

  public findUserByMail(mail: String): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/usersByMail/${mail}`);
  }

  public findFamillyByName(nom: String): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/famille/${nom}`);
  }

  public addUser(user: User) {
    return this.http.post<User>(this.usersUrl + '/nouveauCompte', user);
  }

  public addTaches(tache: Taches) {
    return this.http.post<Taches>(this.usersUrl + '/nouvelleTache', tache)
  }

  public getTache(nom: String){
    return this.http.get<Taches>(this.usersUrl + `/tache/${nom}`)
  }

  public activeTache(userId: string, id: number, tache: Taches){
    return this.http.put<Taches>(this.usersUrl + `/updateTache/${userId}/${id}`, tache)
  }

  public login(user: User) {
    return this.http.post<User>(this.usersUrl + '/login-success', user).pipe(
      map((response: any) => {
        localStorage.setItem('userAuth', JSON.stringify(response));
        return response;
      })
    );
  }

  public decodeToken(): Observable<any>{
    let token: any = localStorage.getItem('userAuth');
    if (token) {
      let decodedToken: any = jwt_decode.jwtDecode(token);
      return this.findUserByMail(decodedToken.sub);
    } else {
      console.error('Token non trouvé dans le local storage.');
      return new Observable();
    }
  }

}
