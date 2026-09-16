import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Ville } from './models/ville'; // Import Ville model

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private baseUrl = 'http://localhost:8809/api/personne';

  constructor(private http: HttpClient) {}




  getPersonneVilles(personneId: number): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.baseUrl}/personnes/${personneId}/villes`);
  }



  getVilleeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl+'/un-ville'}/${id}`);
  }



  createVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(this.baseUrl, ville);
  }

  updateVille(id: number, ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(`${this.baseUrl+'/update-ville'}/${id}`, ville);
  }


  deleteVille(villeId: number): Observable<void> {
    console.log("villeid",villeId)
    return this.http.delete<void>(`${this.baseUrl+'/delete-ville'}/${villeId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error deleting Ville:', error);
          return throwError('An error occurred while deleting the Ville.');
        })
      );
  }



  getDefaultVille(): Ville {
    return {
      villeId: 0, // Or any default value
      nom: 'Default Ville',
      description: 'Default Ville Description',
      personnes: []
    };
  }


  createVilleavecGouvernorat(ville: Ville,nom:any): Observable<Ville> {
    return this.http.post<Ville>(`${this.baseUrl+'/add-ville-and-assign-gouvernorat'}/${nom}`, ville);
  }

  getAllGouvernoratNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/gouvernorats/names`);
  }

}
