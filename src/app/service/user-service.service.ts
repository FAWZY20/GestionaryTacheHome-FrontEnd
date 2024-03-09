import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../dataModels/user';
import { Observable, map, take } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { Taches } from '../dataModels/taches';
import { Note } from '../dataModels/note';

@Injectable({ providedIn: 'root' })
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://gerermamaisoneasy-130830575.eu-west-3.elb.amazonaws.com';
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

  public deleteUser(userId: number) {
    return this.http.delete<User>(this.usersUrl + `/deleteUser/${userId}`)
  }

  public addUserFamily(user: User) {
    return this.http.post<User>(this.usersUrl + '/newUserFamilly', user);
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

  public deleteTache(id: number){
    return this.http.delete(this.usersUrl + `/deleteTache/${id}`)
  }

  public addNote(note: Note){
    return this.http.post<Note>(this.usersUrl + '/nouvelleNote', note)
  }

  public getNote(userId: string){
    return this.http.get<Note>( this.usersUrl +  `/afficherNote/${userId}`)
  }

  public deleteNote(id: number){
    return this.http.delete(this.usersUrl + `/deleteNote/${id}`)
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

  generatePwd() {
    const pwd:any = [];
    const listNmb = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let index = 0; index < 10; index++) {
     pwd.push(Math.floor(Math.random()* listNmb.length))
    }
    return pwd.join("");
  }

}
