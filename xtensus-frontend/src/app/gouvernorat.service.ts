import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gouvernorat } from './models/gouvernorat';

@Injectable({
  providedIn: 'root',
})
export class GouvernoratService {
  private baseUrl = 'http://localhost:8809/api/personne';

  constructor(private http: HttpClient) {}

  addGouvernorat(gouvernorat: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-gouvernorat`, gouvernorat);
  }

  getGouvernoratById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/un-gouvernorat/${id}`);
  }

  updateGouvernorat(id: number, gouvernorat: any): Observable<any> {
    return this.http.put<Gouvernorat>(`${this.baseUrl+'/update-gouvernorat'}/${id}`, gouvernorat);
  }


  deleteGouvernorat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl+'/delete-gouvernorat'}/${id}`);
  }


  getAllGouvernorats(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(this.baseUrl+ '/list-gouvernorat');
  }
}
