import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './models/home-page/home-page.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { NouveauCompteComponent } from './models/nouveau-compte/nouveau-compte.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './models/admin-home/admin-home.component';
import { NavVerticalComponent } from './components/nav-vertical/nav-vertical.component';
import { AdminPage, ConnexionPage } from './service/auth-guard.service';
import { TachePageComponent } from './models/tache-page/tache-page.component';
import { NouvelleTacheComponent } from './models/nouvelle-tache/nouvelle-tache.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListCourseComponent } from './models/list-course/list-course.component';
import { NotesComponent } from './models/notes/notes.component';
import { FormNoteComponent } from './components/form-note/form-note.component';
import { ProfilComponent } from './models/profil/profil.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';


const appRoutes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'connexion', component: ConnexionComponent, canActivate: [ConnexionPage] },
  { path: 'connexion/nouveauCompte', component: NouveauCompteComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AdminPage] },
  { path: 'tache', component: TachePageComponent, canActivate: [AdminPage] },
  { path: 'NouvelleTache', component: NouvelleTacheComponent, canActivate: [AdminPage] },
  { path: 'listeCourse', component: ListCourseComponent, canActivate: [AdminPage] },
  { path: 'note', component: NotesComponent, canActivate: [AdminPage] },
  { path: 'profil', component: ProfilComponent, canActivate: [AdminPage] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    NouveauCompteComponent,
    ConnexionComponent,
    AdminHomeComponent,
    NavVerticalComponent,
    TachePageComponent,
    NouvelleTacheComponent,
    FooterComponent,
    ListCourseComponent,
    NotesComponent,
    FormNoteComponent,
    ProfilComponent,
    UpdateUserComponent
  ],
  imports: [
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
