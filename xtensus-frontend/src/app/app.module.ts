import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonneCrudComponent } from './pages/personnecrud/personnecrud.component';
import { FormsModule } from '@angular/forms';
import { PersonneComponent } from './pages/personne/personne.component';

import { HttpClientModule } from '@angular/common/http';
import { PersonneService } from './personne.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPersonneDialogComponent } from '././add-personne-dialog/add-personne-dialog.component';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { UpdatePersonneDialogComponent } from './pages/update-personne-dialog/update-personne-dialog.component';
import { AjouterPersonnePageComponent } from './pages/ajouter-personne-page/ajouter-personne-page.component';
import { PersonneUpdateComponentComponent } from './pages/personne-update-component/personne-update-component.component';
import { PersonneDetailsComponent } from './pages/personne-details/personne-details.component';
import { MatSelectModule } from '@angular/material/select';

import { DataTablesModule } from 'angular-datatables';

import { MenuComponent } from './pages/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { GouvernoratComponent } from './pages/gouvernorat/gouvernorat.component';
import { GouvernoratCrudComponent } from './pages/gouvernorat-crud/gouvernorat-crud.component';
import { AjoutGouvernoratComponent } from './pages/ajout-gouvernorat/ajout-gouvernorat.component';
import { GouvernoratDetailsComponent } from './pages/gouvernorat-details/gouvernorat-details.component';
import { GouvernoratConfirmationDialogComponent } from './pages/gouvernorat-confirmation-dialog/gouvernorat-confirmation-dialog.component';
import { GouvernoratUpdateComponent } from './pages/gouvernorat-update/gouvernorat-update.component';
import { VilleCrudComponent } from './pages/ville-crud/ville-crud.component';
import { VilleDetailsComponent } from './pages/ville-details/ville-details.component';
import { AjouterVillePageComponent } from './pages/ajouter-ville-page/ajouter-ville-page.component';
import { VilleUpdateComponentComponent } from './pages/ville-update-component/ville-update-component.component';
import { VilleConfirmationDialogComponent } from './pages/ville-confirmation-dialog/ville-confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import * as jsPDF from 'jspdf';
import { StatisticsComponent } from './pages/statistics/statistics.component';



@NgModule({
  declarations: [
    AppComponent,
    PersonneCrudComponent,
    PersonneComponent,
    AddPersonneDialogComponent,
    ConfirmationDialogComponent,
    UpdatePersonneDialogComponent,
    AjouterPersonnePageComponent,
    PersonneUpdateComponentComponent,
    PersonneDetailsComponent,
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    GouvernoratComponent,
    GouvernoratCrudComponent,
    AjoutGouvernoratComponent,
    GouvernoratDetailsComponent,
    GouvernoratConfirmationDialogComponent,
    GouvernoratUpdateComponent,
    VilleCrudComponent,
    VilleDetailsComponent,
    AjouterVillePageComponent,
    VilleUpdateComponentComponent,
    VilleConfirmationDialogComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    DataTablesModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,



  ],
  providers: [PersonneService],
  bootstrap: [AppComponent]



})
export class AppModule {}
