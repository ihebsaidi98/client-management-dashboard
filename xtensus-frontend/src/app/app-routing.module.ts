import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonneCrudComponent } from './pages/personnecrud/personnecrud.component';
import { PersonneComponent } from './pages/personne/personne.component';
import { AjouterPersonnePageComponent } from './pages/ajouter-personne-page/ajouter-personne-page.component';
import { PersonneUpdateComponentComponent } from './pages/personne-update-component/personne-update-component.component';
import { PersonneDetailsComponent } from './pages/personne-details/personne-details.component';
import { HeaderComponent } from './pages/header/header.component';
import { GouvernoratCrudComponent } from './pages/gouvernorat-crud/gouvernorat-crud.component';
import { AjoutGouvernoratComponent } from './pages/ajout-gouvernorat/ajout-gouvernorat.component';
import { GouvernoratDetailsComponent } from './pages/gouvernorat-details/gouvernorat-details.component';
import { GouvernoratUpdateComponent } from './pages/gouvernorat-update/gouvernorat-update.component';
import { VilleCrudComponent } from './pages/ville-crud/ville-crud.component';
import { VilleDetailsComponent } from './pages/ville-details/ville-details.component';
import { AjouterVillePageComponent } from './pages/ajouter-ville-page/ajouter-ville-page.component';
import { VilleUpdateComponentComponent } from './pages/ville-update-component/ville-update-component.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  {
    path: '', // Root path, which loads the HeaderComponent
    component: HeaderComponent,
    children: [

          {  path: 'personne', component: PersonneCrudComponent },
          { path: 'per', component: PersonneComponent },
          { path: 'ajouter-personne', component: AjouterPersonnePageComponent }, // New route for "Ajouter Personne" page
          { path: 'update-personne/:id', component: PersonneUpdateComponentComponent },
          { path: 'edit-person/:id', component: PersonneCrudComponent },
          { path: 'personne/:id', component: PersonneDetailsComponent },
          {  path: 'gouvernorats', component: GouvernoratCrudComponent },
          { path: 'ajouter-gouvernorat', component: AjoutGouvernoratComponent },
          { path: 'gouvernorat-details/:id',component: GouvernoratDetailsComponent},
          { path: 'update-gouvernorat/:id',component: GouvernoratUpdateComponent},
          {  path: 'villes', component: VilleCrudComponent },
          {path: 'ville-details/:id',component: VilleDetailsComponent,},
          { path: 'ajouter-ville', component: AjouterVillePageComponent },
          { path: 'update-ville/:id', component: VilleUpdateComponentComponent },
          { path: 'statistics', component: StatisticsComponent },


    ],

  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



