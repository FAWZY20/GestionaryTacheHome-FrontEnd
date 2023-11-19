import { NgModule } from '@angular/core';
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
import { HomePageAdminComponent } from './models/home-page-admin/home-page-admin.component';
import { AdminHomeComponent } from './models/admin-home/admin-home.component';
import { NavVerticalComponent } from './components/nav-vertical/nav-vertical.component';
import { AuthGuard } from './service/auth-guard.service';


const appRoutes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'connexion/nouveauCompte', component: NouveauCompteComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    NouveauCompteComponent,
    ConnexionComponent,
    HomePageAdminComponent,
    AdminHomeComponent,
    NavVerticalComponent
  ],
  imports: [
    FormsModule,
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
