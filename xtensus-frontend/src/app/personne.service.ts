  import { Injectable } from '@angular/core';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Personne } from './models/personne';
import { Ville } from './models/ville';
import { Gouvernorat } from './models/gouvernorat';


  @Injectable({
    providedIn: 'root'
  })
  export class PersonneService {
    private baseUrl = 'http://localhost:8809/api/personne';

    constructor(private http: HttpClient) {}

    getAllPersonnes(): Observable<Personne[]> {
      return this.http.get<Personne[]>(this.baseUrl+'/list-personne');
    }

    getPersonneById(id: any): Observable<Personne> {
      return this.http.get<Personne>(`${this.baseUrl+'/un-personne'}/${id}`);
    }

    createPersonne(personne: Personne): Observable<Personne> {
      return this.http.post<Personne>(this.baseUrl+'/add-personne', personne);
    }

    /*createPersonneavecville(personne: Personne,nom:any): Observable<Personne> {
      return this.http.post<Personne>(`${this.baseUrl+'/add-personne-and-assign-ville'}/${nom}`, personne);
    }*/

   /* createPersonneavecville(personne: Personne,nomg: any,nom: any): Observable<Personne> {
      return this.http.post<Personne>(`${this.baseUrl}+'/add-personne-and-assign-ville'}/${nomg}/${nom}`, personne);
    }*/
    createPersonneavecville(personne: Personne, nomg: any, nom: any): Observable<Personne> {
      return this.http.post<Personne>(`${this.baseUrl+'/add-personne-and-assign-ville'}/${nomg}/${nom}`, personne);
    }

    getAllVilles(): Observable<Ville[]> {
      return this.http.get<Ville[]>(this.baseUrl + '/list-ville');
    }



    updatePersonne(id: number, personne: Personne): Observable<Personne> {
      return this.http.put<Personne>(`${this.baseUrl+'/update-personne'}/${id}`, personne);
    }

    deletePersonne(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl+'/delete-personne'}/${id}`);
    }



    getAllVilleNames(): Observable<string[]> {
      return this.http.get<string[]>(this.baseUrl+'/villes/names');
    }

    getAllGouvernorats(): Observable<Gouvernorat[]> {
      return this.http.get<Gouvernorat[]>(this.baseUrl+ '/list-gouvernorat');
    }


    generatePdfForPersonnes(): Observable<Blob> {
      const options = { responseType: 'blob' as 'json' };

      return this.http.get<Blob>(`${this.baseUrl+'/generate-pdf'}`, options);
    }
  }
